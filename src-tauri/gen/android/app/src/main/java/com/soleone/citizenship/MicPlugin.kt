package com.soleone.citizenship

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.media.AudioDeviceInfo
import android.media.AudioFormat
import android.media.AudioManager
import android.media.AudioRecord
import android.media.MediaRecorder
import android.util.Base64
import app.tauri.PermissionState
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.Permission
import app.tauri.annotation.PermissionCallback
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.Channel
import app.tauri.plugin.Invoke
import app.tauri.plugin.Plugin
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.concurrent.thread

private const val RATE = 16_000
private const val CHUNK = 1024 // samples, as the page's ScriptProcessor delivers them

@InvokeArg
class MicArgs {
  lateinit var chunks: Channel
}

/**
 * The phone's own mic, recorded without call mode: no communication audio mode and no
 * Bluetooth SCO, so lessons keep playing at full quality, over Bluetooth too.
 */
@TauriPlugin(permissions = [Permission(strings = [Manifest.permission.RECORD_AUDIO], alias = "microphone")])
class MicPlugin(private val activity: Activity) : Plugin(activity) {
  @Volatile private var recording: Thread? = null
  private var recordingFor: Long? = null

  @Command
  fun start(invoke: Invoke) {
    if (getPermissionState("microphone") != PermissionState.GRANTED) {
      requestPermissionForAlias("microphone", invoke, "permissionAnswered")
      return
    }
    record(invoke)
  }

  @PermissionCallback
  fun permissionAnswered(invoke: Invoke) {
    if (getPermissionState("microphone") == PermissionState.GRANTED) record(invoke)
    else invoke.reject("Allow the microphone to answer by voice.")
  }

  /** Stops only the recording for these chunks: a late stop must not end the next listen. */
  @Command
  fun stop(invoke: Invoke) {
    if (invoke.parseArgs(MicArgs::class.java).chunks.id == recordingFor) stopRecording()
    invoke.resolve()
  }

  @SuppressLint("MissingPermission") // checked in start
  private fun record(invoke: Invoke) {
    stopRecording()
    val chunks = invoke.parseArgs(MicArgs::class.java).chunks
    recordingFor = chunks.id
    val size = maxOf(
      AudioRecord.getMinBufferSize(RATE, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT),
      CHUNK * 2 * 4,
    )
    // VOICE_RECOGNITION skips the call-style processing that MIC or VOICE_COMMUNICATION add.
    val recorder = AudioRecord(
      MediaRecorder.AudioSource.VOICE_RECOGNITION,
      RATE,
      AudioFormat.CHANNEL_IN_MONO,
      AudioFormat.ENCODING_PCM_16BIT,
      size,
    )
    // A Bluetooth headset's mic would switch it to its phone-call profile.
    val audio = activity.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    audio.getDevices(AudioManager.GET_DEVICES_INPUTS)
      .firstOrNull { it.type == AudioDeviceInfo.TYPE_BUILTIN_MIC }
      ?.let { recorder.setPreferredDevice(it) }
    recorder.startRecording()
    recording = thread {
      val samples = ShortArray(CHUNK)
      val bytes = ByteBuffer.allocate(CHUNK * 2).order(ByteOrder.LITTLE_ENDIAN)
      try {
        while (recording == Thread.currentThread()) {
          val read = recorder.read(samples, 0, CHUNK)
          if (read <= 0) continue
          bytes.clear()
          bytes.asShortBuffer().put(samples, 0, read)
          chunks.sendObject(Base64.encodeToString(bytes.array(), 0, read * 2, Base64.NO_WRAP))
        }
      } finally {
        recorder.stop()
        recorder.release()
      }
    }
    invoke.resolve()
  }

  private fun stopRecording() {
    val running = recording ?: return
    recording = null
    running.join()
  }
}

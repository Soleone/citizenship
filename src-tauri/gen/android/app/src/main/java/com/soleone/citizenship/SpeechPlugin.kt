package com.soleone.citizenship

import android.app.Activity
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.Invoke
import app.tauri.plugin.Plugin
import java.util.Locale
import java.util.concurrent.ConcurrentHashMap

@InvokeArg
class SpeakArgs {
  lateinit var text: String
}

/** The phone's own voice, for lines without a clip: the WebView has no speechSynthesis. */
@TauriPlugin
class SpeechPlugin(activity: Activity) : Plugin(activity) {
  private val speaking = ConcurrentHashMap<String, Invoke>()
  private val waiting = mutableListOf<Invoke>()
  private var ready = false
  private var next = 0

  private val tts = TextToSpeech(activity) { status ->
    synchronized(waiting) {
      ready = true
      if (status == TextToSpeech.SUCCESS) waiting.forEach(::speakNow)
      else waiting.forEach { it.reject("This phone has no text-to-speech voice.") }
      waiting.clear()
    }
  }.apply {
    language = Locale.CANADA
    setOnUtteranceProgressListener(object : UtteranceProgressListener() {
      override fun onStart(id: String) {}
      override fun onDone(id: String) { speaking.remove(id)?.resolve() }
      override fun onStop(id: String, interrupted: Boolean) { speaking.remove(id)?.resolve() }
      @Deprecated("Superseded by onError(String, Int)")
      override fun onError(id: String) { speaking.remove(id)?.resolve() }
    })
  }

  /** Resolves when the line ends or `silence` cuts it off. */
  @Command
  fun speak(invoke: Invoke) {
    synchronized(waiting) { if (ready) speakNow(invoke) else waiting.add(invoke) }
  }

  @Command
  fun silence(invoke: Invoke) {
    tts.stop()
    invoke.resolve()
  }

  private fun speakNow(invoke: Invoke) {
    val id = "line${next++}"
    speaking[id] = invoke
    tts.speak(invoke.parseArgs(SpeakArgs::class.java).text, TextToSpeech.QUEUE_FLUSH, null, id)
  }
}

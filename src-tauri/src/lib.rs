//! A shell around citizenship.soleone.xyz that adds what the WebView lacks for voice mode.
//!
//! A page that opens the mic puts Android in call mode, which garbles playback and drops
//! Bluetooth to its phone-call profile. The native mic records from the phone's own mic
//! without call mode, so lessons keep playing clean while it listens. The WebView also has
//! no speechSynthesis, so lines without a clip use the phone's voice natively.

#[cfg(target_os = "android")]
mod native {
    use tauri::{
        Manager, State, Wry,
        ipc::Channel,
        plugin::{Builder, PluginHandle, TauriPlugin},
    };

    pub struct Mic(PluginHandle<Wry>);
    pub struct Speech(PluginHandle<Wry>);

    pub fn init() -> TauriPlugin<Wry> {
        Builder::new("native")
            .setup(|app, api| {
                app.manage(Mic(api.register_android_plugin("com.soleone.citizenship", "MicPlugin")?));
                app.manage(Speech(api.register_android_plugin("com.soleone.citizenship", "SpeechPlugin")?));
                Ok(())
            })
            .build()
    }

    async fn call(plugin: &PluginHandle<Wry>, command: &str, args: serde_json::Value) -> Result<(), String> {
        plugin
            .run_mobile_plugin_async::<serde_json::Value>(command, args)
            .await
            .map(|_| ())
            .map_err(|error| error.to_string())
    }

    /// Streams 16 kHz mono samples as base64 16-bit PCM until `mic_stop`.
    #[tauri::command]
    pub async fn mic_start(mic: State<'_, Mic>, chunks: Channel<String>) -> Result<(), String> {
        call(&mic.0, "start", serde_json::json!({ "chunks": chunks })).await
    }

    #[tauri::command]
    pub async fn mic_stop(mic: State<'_, Mic>, chunks: Channel<String>) -> Result<(), String> {
        call(&mic.0, "stop", serde_json::json!({ "chunks": chunks })).await
    }

    /// Resolves when the line has been said or `silence` cut it off.
    #[tauri::command]
    pub async fn speak(speech: State<'_, Speech>, text: String) -> Result<(), String> {
        call(&speech.0, "speak", serde_json::json!({ "text": text })).await
    }

    #[tauri::command]
    pub async fn silence(speech: State<'_, Speech>) -> Result<(), String> {
        call(&speech.0, "silence", serde_json::json!({})).await
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();
    #[cfg(target_os = "android")]
    let builder = builder.plugin(native::init()).invoke_handler(tauri::generate_handler![
        native::mic_start,
        native::mic_stop,
        native::speak,
        native::silence
    ]);
    builder.run(tauri::generate_context!()).expect("error while running Citizenship");
}

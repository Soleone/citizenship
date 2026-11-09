//! A shell around citizenship.soleone.xyz whose one native job is the mic.
//!
//! A page that opens the mic puts Android in call mode, which garbles playback and drops
//! Bluetooth to its phone-call profile. The native mic records from the phone's own mic
//! without call mode, so lessons keep playing clean while it listens.

#[cfg(target_os = "android")]
mod mic {
    use tauri::{
        Manager, State, Wry,
        ipc::Channel,
        plugin::{Builder, PluginHandle, TauriPlugin},
    };

    pub struct Mic(PluginHandle<Wry>);

    pub fn init() -> TauriPlugin<Wry> {
        Builder::new("mic")
            .setup(|app, api| {
                app.manage(Mic(api.register_android_plugin("com.soleone.citizenship", "MicPlugin")?));
                Ok(())
            })
            .build()
    }

    /// Streams 16 kHz mono samples as base64 16-bit PCM until `mic_stop`.
    #[tauri::command]
    pub async fn mic_start(mic: State<'_, Mic>, chunks: Channel<String>) -> Result<(), String> {
        mic.0
            .run_mobile_plugin_async::<serde_json::Value>("start", serde_json::json!({ "chunks": chunks }))
            .await
            .map(|_| ())
            .map_err(|error| error.to_string())
    }

    #[tauri::command]
    pub async fn mic_stop(mic: State<'_, Mic>, chunks: Channel<String>) -> Result<(), String> {
        mic.0
            .run_mobile_plugin_async::<serde_json::Value>("stop", serde_json::json!({ "chunks": chunks }))
            .await
            .map(|_| ())
            .map_err(|error| error.to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();
    #[cfg(target_os = "android")]
    let builder = builder
        .plugin(mic::init())
        .invoke_handler(tauri::generate_handler![mic::mic_start, mic::mic_stop]);
    builder.run(tauri::generate_context!()).expect("error while running Citizenship");
}

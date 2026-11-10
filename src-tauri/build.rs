fn main() {
  // Android 15+ phones with 16 KB memory pages only load native libraries aligned to them.
  if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("android") {
    println!("cargo:rustc-cdylib-link-arg=-Wl,-z,max-page-size=16384");
  }
  tauri_build::build()
}

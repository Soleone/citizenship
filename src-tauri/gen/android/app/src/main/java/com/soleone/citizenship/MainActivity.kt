package com.soleone.citizenship

import android.os.Bundle
import android.view.View
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.core.graphics.Insets
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    // The page sits inside the system bars, so nothing draws under the status or navigation bar.
    val bars = WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
    ViewCompat.setOnApplyWindowInsetsListener(findViewById<View>(android.R.id.content)) { content, insets ->
      val inset = insets.getInsets(bars)
      content.setPadding(inset.left, inset.top, inset.right, inset.bottom)
      WindowInsetsCompat.Builder(insets).setInsets(bars, Insets.NONE).build()
    }
  }

  // Voice mode plays lines and chimes long after the tap that started it.
  override fun onWebViewCreate(webView: WebView) {
    webView.settings.mediaPlaybackRequiresUserGesture = false
  }
}

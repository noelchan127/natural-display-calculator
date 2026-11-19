# The page calls these through WebView.addJavascriptInterface, which R8 cannot see.
-keepclassmembers class io.github.noelchan127.calculator.MainActivity$* {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface

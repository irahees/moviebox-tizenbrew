# MovieBox HD — TizenBrew website launcher

This TizenBrew application module opens the MovieBox HD website at https://movieboxhd.net/ in the TV's web runtime. It is a website launcher, not an Android APK conversion and not a native Tizen streaming client.

## Add to TizenBrew

Open TizenBrew → Module Manager → Add GitHub Module and enter:

`gh/irahees/moviebox-tizenbrew@main`

Then return to TizenBrew Home and launch **MovieBox HD**.

## Termux note

Termux can run the TizenBrew Installer service on your Android phone, but it does not convert an Android APK into a Tizen app. If the installer service is running, open:

`http://localhost:8091/ui/dist/index.html`

Use the installer UI to manage TizenBrew; the module itself is added from TizenBrew's Module Manager on the TV.

## Limitations

- The module only opens the website. Website compatibility, sign-in, playback, ads, and remote-control behavior depend on the website and the TV's built-in browser.
- It does not extract video streams, bypass DRM, or provide access to content you are not authorized to watch.
- The website's own content and service terms apply. This community module is not affiliated with MovieBox.
- A Samsung Tizen TV cannot directly install an Android APK.

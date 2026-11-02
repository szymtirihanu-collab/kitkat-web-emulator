# Android 4.4 ARMv7 guest assets

The `Provision Android 4.4 ARMv7 guest assets` workflow downloads Google's Android SDK API 19 ARM EABI v7a system-image package directly from Google's repository, validates the ZIP, extracts it, and uploads the package and extracted files as a short-lived Actions artifact.

Run it from **Actions → Provision Android 4.4 ARMv7 guest assets → Run workflow**.

This is an asset-provisioning step only. The SDK image is not a complete proof of a bootable Goldfish VM: the browser build still needs a compatible emulator machine, storage wiring, display, and input. Do not describe the site as booting until a real guest reaches Android userspace in a browser.

The package is fetched at build time rather than committed to this repository. This avoids placing a large SDK binary in Git history.

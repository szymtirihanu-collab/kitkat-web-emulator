# KitKat Web Emulator

A mobile-friendly browser front end for [v86](https://github.com/copy/v86), an x86 PC emulator compiled to WebAssembly. It is intended to try booting an Android-x86 4.4 ISO in a temporary live session.

## Important limitations

- This is **x86 emulation**, not native ARM Android and not a port of Android to the phone's hardware.
- Android-x86 4.4 may not boot correctly with v86 or its virtual hardware. It has not been validated against a specific ISO on physical mobile devices.
- You must provide your own Android-x86 4.4 ISO. No OS image is bundled or hosted here.
- No virtual hard disk is attached. Select Live / Run Android; do not select Install.
- Guest changes are temporary and disappear when the VM stops or the page reloads.
- Browser memory and CPU limits on phones may prevent startup or make it very slow.

## Use on a phone

1. Open the GitHub Pages website.
2. Save a compatible Android-x86 4.4 ISO on your phone.
3. Tap **Choose Android-x86 ISO** and select the file.
4. Start with 384–512 MB guest RAM.
5. Tap **Start emulator** and choose Live CD / Run Android in the boot menu.

The ISO is selected locally in your browser; it is not uploaded to this repository.

## Third-party software

v86: https://github.com/copy/v86  
Android-x86 is a separate project; obtain images from an official or trusted source and follow its licensing terms.
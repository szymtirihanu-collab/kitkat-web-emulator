# Android KitKat ARMv7 browser port

This branch is an engineering workspace, not yet a bootable Android emulator.

## Verified direction

A QEMU/WebAssembly implementation has demonstrated an `arm-softmmu` build with QEMU 10.1 and Emscripten. This establishes a plausible 32-bit ARM browser-runtime starting point. It does **not** provide Android's Goldfish board or make a KitKat image bootable by itself.

References:
- https://github.com/ericmigi/pebble-qemu-wasm (documented QEMU 10.1 + Emscripten `arm-softmmu` build)
- https://github.com/3dl-dev/qemu-wasm (browser QEMU / WebAssembly work)
- https://android.googlesource.com/platform/external/qemu/+/emu-dev/ (Android-specific QEMU fork)
- https://android.googlesource.com/platform/external/qemu/+/emu-master-dev/android/docs/ANDROID-KERNEL.TXT (Android kernel/Goldfish notes)

## Target

- Android 4.4.x / API 19
- ARMv7-A, 32-bit (`armeabi-v7a`)
- Matching Goldfish-era board, devices, kernel and guest images

## Required work before this is a real emulator

1. Build a reproducible `qemu-system-arm` WebAssembly runtime.
2. Port or adapt the Android Goldfish ARM machine and required devices into that QEMU version. A generic ARM board is not compatible just because its CPU is ARMv7.
3. Build and test the matching Android 4.4 kernel and device tree.
4. Obtain legally redistributable or user-supplied kernel, ramdisk and system images.
5. Implement browser display, input, storage and worker integration.
6. Boot the guest through init and verify the Android launcher in a real browser.

## Current status

| Component | Status |
|---|---|
| Generic ARM32 QEMU/WebAssembly build path | Demonstrated by an external project; not yet built in this repository |
| Android Goldfish ARM machine in WebAssembly | Not implemented |
| KitKat API 19 guest assets | Not included |
| Browser display/input/storage integration | Not implemented |
| Successful KitKat boot | Not tested |

The existing `main` branch is intentionally preserved. Do not call this branch a working KitKat emulator until an actual browser boot reaches the launcher.

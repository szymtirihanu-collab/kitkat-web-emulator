# ARMv7 KitKat browser port — feasibility update

## Important discovery

A browser-based ARM QEMU runtime is technically possible: Glasshouse documents QEMU compiled to WebAssembly with an ARM64 JIT and a browser UI. That proves the general browser/QEMU/WASM approach is viable, but it does **not** provide a drop-in Android 4.4 ARMv7 emulator or Goldfish machine.

- Glasshouse architecture overview: https://glasshouse.mojolayers.com/info
- Android's QEMU fork and Android-specific drivers: https://android.googlesource.com/platform/external/qemu/+/emu-dev/
- Goldfish virtual hardware specification: https://android.googlesource.com/platform/external/qemu/+/emu-master-dev/android/docs/GOLDFISH-VIRTUAL-HARDWARE.TXT
- QEMU ARM machine model documentation: https://www.qemu.org/docs/master/system/target-arm.html

## Target

- Android 4.4.x (KitKat), API 19
- ARMv7-A / armeabi-v7a (32-bit)
- Goldfish-era ARM board and matching kernel/device drivers

## Why this is not a frontend-only change

The guest kernel expects Goldfish devices. At minimum, the browser emulator needs a matching machine implementation and working devices for framebuffer, input, timer/RTC, storage, and Android emulator communication channels. A generic ARM `virt` machine is not a substitute. The existing root page uses v86, which emulates x86 and cannot execute this ARM guest.

## Work plan

### Phase 1 — runtime port
- Pin a reproducible Android QEMU source revision.
- Determine the smallest Goldfish ARM machine/device set required by the API 19 guest.
- Port/build the ARM system emulator to WebAssembly.
- Provide browser-safe memory, worker, clock, storage, console, and framebuffer integration.
- Verify a small ARM Linux Goldfish test kernel before Android.

### Phase 2 — KitKat guest
- Obtain legally redistributable or user-provided API 19 ARM kernel, ramdisk, and system image.
- Verify image/board compatibility and kernel command line.
- Boot through init and reach the Android launcher.
- Add touch, keyboard, display rotation, audio, and networking only after basic boot works.

### Phase 3 — quality and deployment
- Add persistent disk storage using browser storage APIs.
- Add memory/CPU controls and save/reset controls.
- Run automated smoke tests and publish only after a real browser boot succeeds.

## Current status

| Component | Status |
|---|---|
| ARM guest CPU in a browser | Demonstrated by other QEMU/WASM projects; not integrated here |
| Android Goldfish ARM machine in WASM | Not built |
| KitKat API 19 guest assets | Not included |
| Browser framebuffer/input adapters | Not implemented |
| Successful KitKat boot | Not tested |
| Existing x86/v86 page | Preserved on `main` |

No fake boot button or placeholder console is presented as a functioning emulator. This branch is an isolated ARM port work area; the production page remains unchanged until the backend boots successfully.

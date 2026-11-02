# ARMv7 KitKat browser port — engineering status

## Corrected feasibility finding

The earlier assumption that browser QEMU work had no 32-bit ARM system-emulator path was too pessimistic. A separate QEMU 10.1 + Emscripten project documents building `qemu-system-arm.js`, `.wasm`, and its worker with `--target-list=arm-softmmu` and TCI. This gives us a concrete ARM32 WASM build recipe to investigate.

That is only the CPU/system-emulator foundation. It is **not** an Android KitKat emulator and does not supply Android's Goldfish board.

## Target

- Android 4.4.x / API 19
- ARMv7-A / armeabi-v7a (32-bit)
- Goldfish-era ARM machine and matching guest kernel/device drivers

## Android-specific compatibility requirement

Android's QEMU fork contains Android-specific drivers and board configuration. The ARM guest expects matching virtual devices and device-tree descriptions. A generic ARM `virt` or unrelated ARM board is not a drop-in replacement.

Relevant source material:
- QEMU/WASM ARM32 build example: https://github.com/ericmigi/pebble-qemu-wasm
- QEMU on browser: https://github.com/3dl-dev/qemu-wasm
- Android QEMU fork: https://android.googlesource.com/platform/external/qemu/+/emu-dev/
- Android kernel notes: https://android.googlesource.com/platform/external/qemu/+/emu-master-dev/android/docs/ANDROID-KERNEL.TXT
- Goldfish virtual hardware: https://android.googlesource.com/platform/external/qemu/+/emu-master-dev/android/docs/GOLDFISH-VIRTUAL-HARDWARE.TXT

## Work plan

### Phase 1 — ARM32 WASM baseline
- Reproduce the QEMU 10.1 `arm-softmmu` Emscripten build in CI.
- Confirm that the generated runtime can boot a known compatible ARM test image in a browser.
- Pin every source revision and build dependency.

### Phase 2 — Android board port
- Identify the exact KitKat-era Goldfish ARM board and required devices.
- Port/adapt the machine, device models, IRQ/MMIO map and device tree to the WASM-capable QEMU base.
- Build and boot a minimal matching ARM Linux kernel before attempting Android.

### Phase 3 — KitKat guest
- Use legally redistributable or user-provided API 19 ARM kernel, ramdisk and system image.
- Verify kernel command line, partition layout and Android HAL compatibility.
- Boot through init and verify the Android launcher.

### Phase 4 — browser integration
- Implement framebuffer/display, touch/keyboard, storage persistence, worker lifecycle and browser-safe memory.
- Add audio/networking only after basic boot works.
- Deploy only after a real browser boot test.

## Current status

| Component | Status |
|---|---|
| Generic ARM32 QEMU/WebAssembly build path | Demonstrated externally; not built in this repository |
| Android Goldfish ARM machine in WASM | Not implemented |
| Matching KitKat guest assets | Not included |
| Browser display/input/storage adapters | Not implemented |
| Successful KitKat boot | Not tested |
| Existing x86/v86 page on `main` | Preserved |

No fake boot button or placeholder console is presented as a functioning emulator. The next valid milestone is a reproducible ARM32 WASM build, followed by a Goldfish board port—not a frontend-only replacement.

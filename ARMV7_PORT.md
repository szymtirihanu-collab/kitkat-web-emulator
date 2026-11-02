# Android 4.4 KitKat ARMv7 browser port

## Status: backend not implemented

This project currently boots an x86 guest with v86. That runtime cannot boot an ARM guest, so changing the ISO picker or relabelling the x86 machine would not create an ARM port.

The target is **Android 4.4 / API 19 / ARMv7-A (armeabi-v7a)**.

## Required guest platform

KitKat's Android emulator kernel is from the Goldfish 3.4 generation. The guest must be paired with the matching Android virtual hardware, not a generic ARM PC:

- ARMv7-A CPU (Cortex-A8-compatible baseline)
- KitKat-era Goldfish kernel and matching board configuration
- Matching API 19 ARM system image and ramdisk
- Goldfish virtual devices expected by the guest (framebuffer, input, timer/RTC, audio, pipes, storage, and related devices)

Google's Android kernel documentation maps KitKat 4.4.x to the 3.4 Goldfish kernel and documents the ARMv7-A `goldfish_armv7_defconfig`. It also distinguishes the legacy Goldfish board from Ranchu. Sources:
- https://android.googlesource.com/platform/external/qemu/+/master/docs/ANDROID-KERNEL.TXT
- https://android.googlesource.com/platform/external/qemu/+/master/docs/GOLDFISH-VIRTUAL-HARDWARE.TXT

## Why a generic ARM WebAssembly QEMU build is not enough

QEMU's ARM system emulator requires an explicit machine model. An image built for one board normally will not boot on another. The standard QEMU `virt` board is not the Android Goldfish board.

The browser runtime therefore needs an Android-compatible QEMU build with the Goldfish ARM machine and devices preserved, compiled to WebAssembly with the required browser I/O and display adapters. The current v86 dependency is x86-only and cannot be reused for this.

References:
- https://www.qemu.org/docs/master/system/target-arm.html
- https://android.googlesource.com/platform/external/qemu/+/emu-master-dev/android/docs/ANDROID-KERNEL.TXT

## Implementation sequence

1. Build a reproducible WebAssembly target from the Android QEMU Goldfish source tree, including the ARM Goldfish board and devices.
2. Verify that the resulting module exports a usable browser-facing API and can run a small ARM Linux Goldfish test image.
3. Add browser adapters for serial console, framebuffer, keyboard/touch input, storage, and pause/stop.
4. Boot the matching KitKat API 19 ARMv7 kernel + ramdisk + system image.
5. Test a clean boot to the Android launcher in a real browser before enabling the ARM page as a working emulator.

## Current repository behavior

- `/`: existing experimental x86/v86 page. Kept unchanged.
- No ARM boot backend or KitKat images are currently bundled.
- No claim is made that ARM boot works until the above tests pass.

This file is the engineering handoff for the ARMv7 port; it is deliberately not presented as a working emulator.

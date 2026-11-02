# ARMv7 development page

This is a status and engineering page, not a working emulator.

The root project currently uses v86, an x86 emulator. The KitKat target is ARMv7-A and expects Android Goldfish virtual hardware. Do not connect an ARM kernel to v86 or claim that a generic QEMU ARM `virt` machine is equivalent.

See [the engineering plan](../ARMV7_PORT.md). The page must remain clearly marked as not bootable until a real browser test reaches the Android launcher.

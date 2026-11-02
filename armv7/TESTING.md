# Runtime test bench

Open `index.html` in GitHub Pages at `/armv7/test.html`.

1. Download the `qemu-system-arm-wasm-baseline` Actions artifact.
2. Select its JS, WASM and worker files.
3. Load the runtime and inspect `-machine help`.
4. Select the API 19 ARMv7 kernel, ramdisk and system image and try the Goldfish boot command.

**Known limitation:** the baseline build is generic QEMU 10.1. It is not yet confirmed to include Android's legacy Goldfish machine or Android-specific storage devices. The page intentionally exposes the real QEMU error/output and does not simulate a successful boot. The boot command is experimental and must be adapted once the matching Goldfish board/device models are ported.

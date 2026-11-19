# IPSW Lab — iPhone 11 / iOS 16.5

A static GitHub Pages tool for selecting an IPSW and inspecting its ZIP archive and root `BuildManifest.plist` in the browser.

## Target
- Device: standard iPhone 11
- Product type: `iPhone12,1`
- SoC: Apple A13 Bionic
- Requested firmware: iOS 16.5, build `20F66`

## What it does
- Opens a user-selected `.ipsw` archive locally with JSZip.
- Lists archive paths and uncompressed sizes.
- Attempts to read an XML `BuildManifest.plist` and display product/build metadata.
- Does not upload firmware to GitHub or a backend.

## What it does not do
This is **not an iPhone emulator**. QEMU's generic ARM machines do not model the iPhone 11's Apple SoC and complete platform/secure-boot hardware. WebAssembly does not change that. An IPSW is a restore bundle, not a generic VM disk. This frontend cannot boot iOS, restore a phone, bypass activation, or emulate SEP/baseband hardware.

Large IPSWs may exceed a browser's available memory. Binary-plist manifests are not parsed by this initial version; the tool reports that limitation instead of guessing.

## Deploy
The parent repository's GitHub Pages workflow publishes this folder at:

`https://szymtirihanu-collab.github.io/kitkat-web-emulator/ios16-ipsw-lab/`

The page loads JSZip from jsDelivr. No firmware file is bundled.

## License
Project code is provided as-is. Respect Apple's firmware terms and only use firmware you are entitled to access.
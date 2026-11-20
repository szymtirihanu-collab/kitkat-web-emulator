# IPSW Lab — iPhone 11 / iOS 16.5

Static, browser-only IPSW inspector. Firmware is selected from the user's device and processed locally; there is no application backend and no firmware upload.

## Target
- Standard iPhone 11 (iPhone12,1, A13)
- Requested iOS 16.5 build 20F66

## Features
- zip.js with Blob-backed random-access ZIP reading, avoiding an eager copy of the entire multi-gigabyte IPSW into JavaScript memory.
- ZIP64 support for archives larger than 4 GB.
- Archive path and uncompressed-size listing.
- Reads only BuildManifest.plist for metadata inspection.
- Detects tiny HTML error documents such as HTTP “requested range not satisfiable”.

## Limitations
This is an IPSW inspector, not an iPhone emulator. The referenced ios-qemu project is a native QEMU project for an Apple-Silicon Mac, documented for iPhone X / iOS 16.7.16. It needs a host QEMU installation and separately built XNU kernel; it cannot be embedded as a self-contained GitHub Pages/WebAssembly app or provide backend-free iPhone 11 / iOS 16.5 emulation.

If Safari reports a 203-byte HTML error, the selected file is an error response rather than the 5.3 GB IPSW. Ensure the download is fully completed and available locally in Files. The webpage cannot reconstruct firmware from those 203 bytes.

GitHub Pages: https://szymtirihanu-collab.github.io/kitkat-web-emulator/ios16-ipsw-lab/

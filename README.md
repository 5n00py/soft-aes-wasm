# soft-aes-wasm

This project provides a WebAssembly (Wasm) interface for the
[soft-aes](https://github.com/5n00py/soft-aes) Rust library, allowing for AES
encryption and decryption directly in web applications. It includes support for
AES ECB and AES CBC modes and integrated Cipher-based Message Authentication
Code (AES-CMAC) calculation.

The library includes support for PKCS#7 padding and 0x80 padding (ISO/IEC
9797-1 Padding Method 2).

**IMPORTANT:**  This implementation currently does not incorporate defenses
against side-channel attacks. Consequently, Soft-AES is optimally positioned
for educational purposes and non-critical application scenarios where such
advanced protections are not a primary concern.

## Table of Contents

- [Installation with npm](#installation-with-npm)
- [Building from Source](#building-from-source)
- [Usage](#usage)
- [Test](#test)
- [Related Projects](#related-projects)
  - [soft-aes](#soft-aes)
  - [Web UI](#web-ui)
- [License](#license)

## Installation with npm

To integrate `soft-aes-wasm` in your web project using npm, follow these steps:

1. Add the `soft-aes-wasm` package to your project:

   ```sh 
   npm install soft-aes-wasm
   ```

2. Import and initialize the module in your custom JavaScript file:

   ```javascript
   import init, {
      wasm_aes_enc_ecb,
      wasm_aes_dec_ecb,
      wasm_aes_enc_cbc,
      wasm_aes_dec_cbc,
      wasm_aes_cmac
    } from "path/to/pkg/soft_aes_wasm.js";

   async function run() {
       await init(); // Initialize the wasm module

       // Implement your AES logic here...
   }

   run();
   ```

## Building from Source

If you want to build the Wasm module from the source, clone the repository and
run `wasm-pack`:

```sh
git clone https://github.com/5n00py/soft-aes-wasm.git
cd soft-aes-wasm
wasm-pack build --target web
```

## Usage

This is a basic example of how to use the AES ECB and CBC functions:

```javascript
// AES ECB
const plaintext = new TextEncoder().encode("Example plaintext.");
const key = new TextEncoder().encode("Very secret key.");
const encryptedEcb = wasm_aes_enc_ecb(plaintext, key, "PKCS7");
const decryptedEcb = wasm_aes_dec_ecb(encryptedEcb, key, "PKCS7");

// AES CBC
const key = new TextEncoder().encode("Very secret key.");
const iv = new TextEncoder().encode("Random Init Vec.");
const encryptedCbc = wasm_aes_enc_cbc(plaintext, key, iv, "PKCS7");
const decryptedCbc = wasm_aes_dec_cbc(encryptedCbc, key, iv, "PKCS7");
```

**Notes:**
- `plaintext` should be a `Uint8Array`.
- `key` should be a `Uint8Array` of 16 bytes (AES-128), 24 bytes (AES-192), or
  32 bytes (AES-256).
- `iv` for AES CBC should be a 16-byte `Uint8Array`.

In the example above a 16-byte key is used to demonstrate AES-128. Changing the
key length to 24 or 32 bytes will use AES-192 or AES-256 respectively. The IV
for AES CBC must always be 16 bytes regardless of the AES variant.


## Test

To run tests, clone the project form github and build from source as described
above. Navigate to the **root folder** and start a local server, e.g.:

```sh
python3 -m http.server
```

Open your browser and go to `http://localhost:8000/test/index.html` to see the
test results.

## Related Projects

### soft-aes 

The core Rust library on which this project relies is
[soft-aes](https://github.com/5n00py/soft-aes).

### Web UI

For a practical and user-friendly integration of this library in the browser
visit [AES-Wasm Tool](https://jointech.at/tools/aes-wasm/index.html).

## License

Copyright David Schmid (david.schmid@mailbox.org)

Binaries are subject to the terms of the GPL-3.0 License - see the
[LICENSE](LICENSE) file for details.

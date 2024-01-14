# soft-aes-wasm

This project provides a WebAssembly (Wasm) interface for the
[soft-aes](https://github.com/5n00py/soft-aes) Rust
library, allowing for AES encryption and decryption directly in web
applications. It includes support for both AES ECB and AES CBC modes.

**IMPORTANT: **  This implementation currently does not incorporate defenses
against side-channel attacks. Consequently, Soft-AES is optimally positioned
for educational purposes and non-critical application scenarios where such
advanced protections are not a primary concern.

## Installation with npm

To use `soft-aes-wasm` in your web project, follow these steps:

1. Add the `soft-aes-wasm` package to your project. If you're using npm, you
   can do this by running:

   ```sh 
   npm install soft-aes-wasm
   ```

2. Import and initialize the module in your custom JavaScript file:

   ```javascript
   import init, { wasm_aes_enc_ecb, wasm_aes_dec_ecb, wasm_aes_enc_cbc, wasm_aes_dec_cbc } from 'soft-aes-wasm';

   async function run() {
       await init(); // Initialize the wasm module

       // Implement your AES logic here...
   }

   run();
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

## Building from Source

If you want to build the Wasm module from the source, clone the repository and
run `wasm-pack`:

```sh
git clone https://github.com/5n00py/soft-aes-wasm.git
cd soft-aes-wasm
wasm-pack build --target web
```

## Test

To run tests, navigate to the `test` folder and start a local server:

```sh
cd test
python3 -m http.server
```

Open your browser and go to `http://localhost:8000` to see the test results.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE)
file for details.

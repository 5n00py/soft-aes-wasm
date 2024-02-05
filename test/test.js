import init, {
  wasm_aes_enc_ecb,
  wasm_aes_dec_ecb,
  wasm_aes_enc_cbc,
  wasm_aes_dec_cbc,
  wasm_aes_cmac
} from "../pkg/soft_aes_wasm.js";

function appendOutput(message, outputId) {
  const output = document.getElementById(outputId);
  output.innerHTML += message + "<br>";
}

function byteArrayToHexString(byteArray) {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2).toUpperCase();
  }).join(':');
}

async function testAesEcb() {
  const plaintext = new TextEncoder().encode("Example plaintext.");
  const key = new TextEncoder().encode("Very secret key.");

  appendOutput("Starting AES ECB Test", "output-ecb");
  try {
    const encrypted = wasm_aes_enc_ecb(plaintext, key, "PKCS7");
    const encryptedHex = byteArrayToHexString(encrypted);
    appendOutput("Encrypted Data (ECB): " + encryptedHex, "output-ecb");

    const decrypted = wasm_aes_dec_ecb(encrypted, key, "PKCS7");
    const decryptedText = new TextDecoder().decode(decrypted);
    appendOutput("Decrypted Data (ECB): " + decryptedText, "output-ecb");

    if (decryptedText === "Example plaintext.") {
      appendOutput(
        "ECB Test Passed: Decrypted text matches the original plaintext.",
        "output-ecb",
      );
    } else {
      appendOutput(
        "ECB Test Failed: Decrypted text does not match the original plaintext.",
        "output-ecb",
      );
    }
  } catch (error) {
    appendOutput("ECB Test Error: " + error, "output-ecb");
  }
}

async function testAesCbc() {
  const plaintext = new TextEncoder().encode("Example plaintext CBC.");
  const key = new TextEncoder().encode("Very secret key.");
  const iv = new TextEncoder().encode("Random Init Vec.");

  appendOutput("Starting AES CBC Test", "output-cbc");
  try {
    const encrypted = wasm_aes_enc_cbc(plaintext, key, iv, "PKCS7");
    const encryptedHex = byteArrayToHexString(encrypted);
    appendOutput("Encrypted Data (CBC): " + encryptedHex, "output-cbc");

    const decrypted = wasm_aes_dec_cbc(encrypted, key, iv, "PKCS7");
    const decryptedText = new TextDecoder().decode(decrypted);
    appendOutput("Decrypted Data (CBC): " + decryptedText, "output-cbc");

    if (decryptedText === "Example plaintext CBC.") {
      appendOutput(
        "CBC Test Passed: Decrypted text matches the original plaintext.",
        "output-cbc",
      );
    } else {
      appendOutput(
        "CBC Test Failed: Decrypted text does not match the original plaintext.",
        "output-cbc",
      );
    }
  } catch (error) {
    appendOutput("CBC Test Error: " + error, "output-cbc");
  }
}

async function testAesCmac() {
  appendOutput("Starting AES CMAC Test", "output-cmac");

  // Define the key and message in hexadecimal format
  const keyHex = "2b7e151628aed2a6abf7158809cf4f3c";
  const messageHex = "6bc1bee22e409f96e93d7e117393172a";

  // Convert the hex strings to byte arrays
  const key = Uint8Array.from(keyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const message = Uint8Array.from(messageHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

 try {
    const mac = await wasm_aes_cmac(message, key);
    const macHex = byteArrayToHexString(mac);
    appendOutput("MAC Data (CMAC): " + macHex, "output-cmac");

    // Expected MAC in hexadecimal format
    const expectedMacHex = "070a16b46b4d4144f79bdd9dd04a287c";

    // Remove colons for comparison
    const formattedMacHex = macHex.replace(/:/g, "").toLowerCase();

    if (formattedMacHex === expectedMacHex) {
      appendOutput("CMAC Test Passed: MAC matches the expected value.", "output-cmac");
    } else {
      appendOutput("CMAC Test Failed: MAC does not match the expected value.", "output-cmac");
    }
  } catch (error) {
    appendOutput("CMAC Test Error: " + error, "output-cmac");
  }
}

async function run() {
  await init();
  await testAesEcb();
  await testAesCbc();
  await testAesCmac();
}

run();

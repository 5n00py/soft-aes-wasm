import init, {
  wasm_aes_enc_ecb,
  wasm_aes_dec_ecb,
  wasm_aes_enc_cbc,
  wasm_aes_dec_cbc,
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

async function run() {
  await init();
  await testAesEcb();
  await testAesCbc();
}

run();

use soft_aes::aes::{aes_dec_cbc, aes_dec_ecb, aes_enc_cbc, aes_enc_ecb};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_aes_enc_ecb(
    plaintext: Vec<u8>,
    key: Vec<u8>,
    padding: Option<String>,
) -> Result<Vec<u8>, JsValue> {
    let padding_str = padding.as_deref();
    aes_enc_ecb(&plaintext, &key, padding_str).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn wasm_aes_dec_ecb(
    ciphertext: Vec<u8>,
    key: Vec<u8>,
    padding: Option<String>,
) -> Result<Vec<u8>, JsValue> {
    let padding_str = padding.as_deref();
    aes_dec_ecb(&ciphertext, &key, padding_str).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn wasm_aes_enc_cbc(
    plaintext: Vec<u8>,
    key: Vec<u8>,
    iv: Vec<u8>,
    padding: Option<String>,
) -> Result<Vec<u8>, JsValue> {
    // Ensure IV is the correct size
    if iv.len() != 16 {
        return Err(JsValue::from_str("IV must be 16 bytes long"));
    }
    let iv_array: [u8; 16] = iv.try_into().unwrap_or_else(|_| [0u8; 16]);
    let padding_str = padding.as_deref();
    aes_enc_cbc(&plaintext, &key, &iv_array, padding_str)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn wasm_aes_dec_cbc(
    ciphertext: Vec<u8>,
    key: Vec<u8>,
    iv: Vec<u8>,
    padding: Option<String>,
) -> Result<Vec<u8>, JsValue> {
    // Ensure IV is the correct size
    if iv.len() != 16 {
        return Err(JsValue::from_str("IV must be 16 bytes long"));
    }
    let iv_array: [u8; 16] = iv.try_into().unwrap_or_else(|_| [0u8; 16]);
    let padding_str = padding.as_deref();
    aes_dec_cbc(&ciphertext, &key, &iv_array, padding_str)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

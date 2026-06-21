import CryptoJS from "crypto-js";
//#region src/lib/encryption.ts
var SECRET_KEY = "sammy-room-secret-2025";
function encrypt(text) {
	if (!text) return "";
	return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}
function decrypt(ciphertext) {
	if (!ciphertext) return "";
	try {
		return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(CryptoJS.enc.Utf8);
	} catch {
		return ciphertext;
	}
}
//#endregion
export { decrypt, encrypt };

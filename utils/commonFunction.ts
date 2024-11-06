import { parsePhoneNumberFromString } from "libphonenumber-js";

export function decodeHtmlEntities(str: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function containsPhoneNumber(text: string): boolean {
  const words = text.split(/\s+/);
  return words.some((word) => {
    // Remove common phone number separators
    const cleanWord = word.replace(/[-.()\s]/g, "");
    // Check for sequences of 8 or more digits
    if (/\d{8,}/.test(cleanWord)) {
      return true;
    }
    // Additional check using libphonenumber-js for international formats
    try {
      const phoneNumber = parsePhoneNumberFromString(cleanWord);
      return phoneNumber?.isPossible();
    } catch {
      return false;
    }
  });
}

export function containsEmail(text: string): boolean {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(text);
}

// ===== VALIDADORES CON REGEX =====

import { REGEX_PATTERNS } from "./reglas";

 class RegexValidator {
  
  static isValidEmail(email: string): boolean {
    return REGEX_PATTERNS.EMAIL_VALID.test(email);
  }
  
  static isValidPhone(phone: string): boolean {
    return REGEX_PATTERNS.PHONE_VALID.test(phone);
  }
  
  static isValidName(name: string): boolean {
    return REGEX_PATTERNS.NAME_VALID.test(name);
  }
  
  static isValidURL(url: string): boolean {
    return REGEX_PATTERNS.URL_VALID.test(url);
  }
  
  static isValidHexColor(color: string): boolean {
    return REGEX_PATTERNS.HEX_COLOR.test(color);
  }
  
  static isValidZipCode(zip: string): boolean {
    return REGEX_PATTERNS.ZIP_CODE.test(zip);
  }
  
  static isValidDecimal(num: string): boolean {
    return REGEX_PATTERNS.DECIMAL.test(num);
  }

  // Validador personalizado con regex
  static customValidate(input: string, pattern: RegExp): boolean {
    return pattern.test(input);
  }
}

export const validatorRegex = new RegexValidator();
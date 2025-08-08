// ===== SANITIZADORES BASADOS EN REGEX =====
import { REGEX_PATTERNS } from "./reglas";

class RegexSanitizer {
  
  // Sanitización general anti-XSS
  static sanitizeGeneral(input: string, maxLength: number = 500): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .substring(0, maxLength)
      .replace(REGEX_PATTERNS.XSS_PATTERNS, '')
      .replace(REGEX_PATTERNS.SQL_INJECTION, '')
      .replace(REGEX_PATTERNS.DANGEROUS_CHARS, '')
      .replace(REGEX_PATTERNS.MULTIPLE_SPACES, ' ')
      .trim();
  }

  // Nombre de persona
  static sanitizeName(name: string): string {
    if (!name || typeof name !== 'string') return '';
    
    return name
      .substring(0, 100)
      .replace(REGEX_PATTERNS.NAME_CLEAN, '')
      .replace(REGEX_PATTERNS.MULTIPLE_SPACES, ' ')
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, letter => letter.toUpperCase()); // Capitalizar primera letra
  }

  // Email
  static sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') return '';
    
    return email
      .substring(0, 254)
      .toLowerCase()
      .replace(REGEX_PATTERNS.EMAIL_CLEAN, '')
      .trim();
  }

  // Teléfono
  static sanitizePhone(phone: string): string {
    if (!phone || typeof phone !== 'string') return '';
    
    return phone
      .substring(0, 20)
      .replace(REGEX_PATTERNS.PHONE_CLEAN, '')
      .trim();
  }

  // URL
  static sanitizeURL(url: string): string {
    if (!url || typeof url !== 'string') return '';
    
    const cleanUrl = url.trim().toLowerCase();
    
    // Solo permitir HTTP/HTTPS
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      return '';
    }
    
    return cleanUrl.substring(0, 2048);
  }

  // Texto alfanumérico
  static sanitizeAlphanumeric(text: string): string {
    if (!text || typeof text !== 'string') return '';
    
    return text
      .substring(0, 200)
      .replace(REGEX_PATTERNS.ALPHANUMERIC, '')
      .trim();
  }

  // Solo números
  static sanitizeNumeric(text: string, allowDecimals: boolean = false): string {
    if (!text || typeof text !== 'string') return '';
    
    if (allowDecimals) {
      return text.replace(/[^\d.-]/g, '').substring(0, 20);
    }
    
    return text.replace(REGEX_PATTERNS.NUMBERS_ONLY, '').substring(0, 20);
  }

  // Texto seguro (para comentarios, descripciones)
  static sanitizeSafeText(text: string, maxLength: number = 1000): string {
    if (!text || typeof text !== 'string') return '';
    
    return text
      .substring(0, maxLength)
      .replace(REGEX_PATTERNS.XSS_PATTERNS, '')
      .replace(REGEX_PATTERNS.SQL_INJECTION, '')
      .replace(REGEX_PATTERNS.SAFE_TEXT, '')
      .replace(REGEX_PATTERNS.MULTIPLE_SPACES, ' ')
      .trim();
  }

  // Color hexadecimal
  static sanitizeHexColor(color: string): string {
    if (!color || typeof color !== 'string') return '';
    
    const cleanColor = color.trim().toUpperCase();
    if (REGEX_PATTERNS.HEX_COLOR.test(cleanColor)) {
      return cleanColor;
    }
    return '';
  }

  // Código postal
  static sanitizeZipCode(zip: string): string {
    if (!zip || typeof zip !== 'string') return '';
    
    const cleanZip = zip.replace(/[^\d\-\s]/g, '').trim();
    return REGEX_PATTERNS.ZIP_CODE.test(cleanZip) ? cleanZip : '';
  }
}


export const sanitizerRegex = new RegexSanitizer();
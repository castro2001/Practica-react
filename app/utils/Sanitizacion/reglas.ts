// ===== EXPRESIONES REGULARES PARA SANITIZACIÓN =====

export const REGEX_PATTERNS = {
  // Caracteres peligrosos comunes
  DANGEROUS_CHARS: /[<>\"'%;()&+\x00-\x1f\x7f-\x9f]/g,
  
  // Ataques XSS comunes
  XSS_PATTERNS: /(javascript:|data:|vbscript:|onload|onerror|onclick|onmouseover|onfocus|onblur)/gi,
  
  // SQL Injection patterns
  SQL_INJECTION: /(union|select|insert|update|delete|drop|create|alter|exec|execute|\-\-|\/\*|\*\/)/gi,
  
  // Solo letras y espacios
  LETTERS_ONLY: /[^a-zA-ZÀ-ÿ\s]/g,
  
  // Solo números
  NUMBERS_ONLY: /[^\d]/g,
  
  // Alfanumérico
  ALPHANUMERIC: /[^a-zA-Z0-9]/g,
  
  // Email válido (más estricto)
  EMAIL_VALID: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  EMAIL_CLEAN: /[^a-zA-Z0-9@._-]/g,
  
  // Teléfono
  PHONE_CLEAN: /[^\d+\-\s()]/g,
  PHONE_VALID: /^[\+]?[\d\s\-()]{7,20}$/,
  
  // URL
  URL_VALID: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  
  // Nombres (letras, espacios, guiones, apostrofes)
  NAME_CLEAN: /[^a-zA-ZÀ-ÿ\s'-]/g,
  NAME_VALID: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  
  // Texto general seguro
  SAFE_TEXT: /[^a-zA-Z0-9À-ÿ\s.,;:!?¿¡\-_]/g,
  
  // Espacios múltiples
  MULTIPLE_SPACES: /\s+/g,
  
  // Código postal
  ZIP_CODE: /^[\d\-\s]{3,10}$/,
  
  // Números decimales
  DECIMAL: /^[\d.,]+$/,
  
  // Hexadecimal
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
};
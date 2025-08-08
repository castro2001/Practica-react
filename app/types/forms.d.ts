import type { validatorRegex } from "~/utils/Sanitizacion/RegexSanitizer";
import type { sanitizerRegex } from "~/utils/Sanitizacion/RegexValidator";

// Tipos de sanitización que corresponden a los métodos de tu clase
export type SanitizationType = 
  | 'none'
  | 'sanitizeGeneral'
  | 'sanitizeName'
  | 'sanitizeEmail'
  | 'sanitizePhone'
  | 'sanitizeURL'
  | 'sanitizeAlphanumeric'
  | 'sanitizeNumeric'
  | 'sanitizeSafeText'
  | 'sanitizeHexColor'
  | 'sanitizeZipCode';

// Tipos de validación que corresponden a los métodos de tu clase
export type ValidationType = 
  | 'none'
  | 'isValidEmail'
  | 'isValidPhone'
  | 'isValidName'
  | 'isValidURL'
  | 'isValidHexColor'
  | 'isValidZipCode'
  | 'isValidDecimal'
  | 'customValidate';



type Field<T> = {
  name: keyof T;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  classNameContenedor?:string;
  classNameLabel?:string;
  classNameInput?:string;
  // // CONFIGURACIÓN PARA TUS CLASES
  // sanitization?: {
  //   method: SanitizationType;
  //   maxLength?: number;        // Para métodos que lo necesiten
  //   allowDecimals?: boolean;   // Para sanitizeNumeric
  //   realTime?: boolean;        // Sanitizar mientras escribe o solo al blur
  // };
  // validation?: {
  //   method: ValidationType;
  //   customPattern?: RegExp;    // Para customValidate
  //   showError?: boolean;       // Mostrar errores de validación
  // };
};

 type Props<T> = {
  fields: Field<T>[];
  values: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  //  onValidationError?: (fieldName: string, error: string | null) => void;
};

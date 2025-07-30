// Button.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
  children: React.ReactNode;
}

// Define los tipos de las props del botón

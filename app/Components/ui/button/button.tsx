import React from 'react';
import type { ButtonProps } from './Button.types';
import { buttonVariants } from './Button.variants';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...rest
}) => {
  const variantClass = buttonVariants[variant] || buttonVariants.primary;

  return (
    <button
      className={`${variantClass} px-4 py-2 rounded focus:outline-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

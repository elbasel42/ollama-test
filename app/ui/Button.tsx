import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const buttonClassName = "rounded-full border border-white px-4 py-4";
  return (
    <button className={twMerge(buttonClassName, className)} {...props}>
      {children}
    </button>
  );
};

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  className?: string;
  icon?: LucideIcon;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  type = 'button'
}: ButtonProps) => {
  const base = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
    ghost: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
    dark: "bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;

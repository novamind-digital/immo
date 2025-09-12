import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = 'link',
  size = 'medium',
  disabled = false,
}) => {
  const baseClasses = 'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg',
    link: 'text-primary-500 hover:text-primary-600 underline',
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
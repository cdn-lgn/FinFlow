import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingButton = ({
  isLoading,
  disabled,
  onClick,
  children,
  className = '',
  style = {},
  loadingText = 'Processing...'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center ${className}`}
      style={{
        opacity: (isLoading || disabled) ? 0.7 : 1,
        ...style
      }}
    >
      {isLoading && <FiLoader className="animate-spin mr-2" />}
      {isLoading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;

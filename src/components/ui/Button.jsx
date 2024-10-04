import React, { ButtonHTMLAttributes } from 'react'


export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const baseStyles = 'font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'
  
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

import React, { forwardRef } from 'react'

const Input = forwardRef(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
import React from 'react'

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

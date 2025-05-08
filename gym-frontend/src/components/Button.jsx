// src/components/Button.jsx
import React from "react";

export default function Button({ children, onClick, variant = "default", size = "md" }) {
    const baseClass = "rounded-lg font-medium transition-all duration-200";
    const sizeClass = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };
  
    const variantClass = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-gray-400 text-gray-700 hover:bg-gray-200",
      ghost: "text-gray-700 hover:bg-gray-100",
    };
  
    return (
      <button
        className={`${baseClass} ${sizeClass[size]} ${variantClass[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
}

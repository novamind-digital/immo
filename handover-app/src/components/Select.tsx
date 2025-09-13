import React, { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  placeholder: _placeholder = "Bitte auswählen"
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;
  
  return (
    <div className="mb-4">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 pt-6 pb-2 pr-10 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none ${
            error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
          }`}
        >
          <option value="" disabled hidden></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label
          className={`absolute left-3 transition-all duration-300 pointer-events-none select-none ${
            shouldFloat
              ? 'text-xs text-gray-500 top-2'
              : 'text-base text-gray-400 top-4'
          }`}
        >
          {label}
          {required && <span className="ml-1">*</span>}
        </label>
        {/* Dropdown Arrow */}
        <div className="absolute top-4 right-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
import React, { useState } from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  required = false,
  error
}) => {
  // Format input to TT.MM.JJ
  const formatDateInput = (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    
    // Add dots after 2nd and 4th digit
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = digits.slice(0, 2) + '.' + digits.slice(2);
    }
    if (digits.length >= 5) {
      formatted = digits.slice(0, 2) + '.' + digits.slice(2, 4) + '.' + digits.slice(4, 6);
    }
    
    return formatted;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    onChange(formatted);
  };
  
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;
  
  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={8}
          className={`w-full px-3 pt-6 pb-2 pr-10 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            error
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
          }`}
          placeholder=""
        />
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
        {/* Calendar Icon */}
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        {/* Format hint - only show when not floating */}
        {!shouldFloat && (
          <div className="absolute right-12 top-4 text-xs text-gray-400">
            TT.MM.JJ
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;
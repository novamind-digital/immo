import React, { useState } from 'react';

interface NumberInputProps {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  required?: boolean;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  min,
  max,
  step = 1,
  suffix
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange('');
      return;
    }
    
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };
  
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '';
  const shouldFloat = isFocused || hasValue;
  
  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          step={step}
          className={`w-full px-3 pt-6 pb-2 ${suffix ? 'pr-16' : 'pr-3'} border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
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
        {/* Suffix */}
        {suffix && (
          <div className="absolute right-3 top-4 text-sm text-gray-500 pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default NumberInput;
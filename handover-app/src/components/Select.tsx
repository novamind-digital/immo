import React, { useState, useRef, useEffect } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const selectedOption = options.find(option => option.value === value);
  
  if (isMobile) {
    return (
      <div className="mb-4 relative" ref={selectRef}>
        <div className="relative">
          <div
            onClick={() => {
              setIsOpen(!isOpen);
              setIsFocused(!isOpen);
            }}
            className={`w-full px-3 pt-6 pb-2 pr-10 border rounded-xl bg-white cursor-pointer transition-all duration-200 min-h-[56px] flex items-center ${
              error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            } ${isOpen ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
          >
            {selectedOption ? selectedOption.label : ''}
          </div>
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
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
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
        
        {/* Custom Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`px-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                } ${option === options[0] ? 'rounded-t-xl' : ''} ${
                  option === options[options.length - 1] ? 'rounded-b-xl' : ''
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  // Desktop version - keep native select
  return (
    <div className="mb-4 relative z-10" style={{ isolation: 'isolate' }}>
      <div className="relative" style={{ zIndex: 1 }}>
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
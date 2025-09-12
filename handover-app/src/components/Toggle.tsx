import React from 'react';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps {
  label?: string;
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  options,
  value,
  onChange,
  name
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div className="relative flex bg-gray-100 rounded-xl p-1 w-full">
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative flex-1 px-6 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none ${
              value === option.value
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
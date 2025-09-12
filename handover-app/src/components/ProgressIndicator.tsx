import React from 'react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white px-4 py-6">
      <div className="flex justify-center items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  index === currentStep
                    ? 'bg-primary-500 text-white'
                    : step.isCompleted
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.isCompleted ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-2xl">{step.icon}</span>
                )}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center" style={{ maxWidth: '5rem' }}>
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 transition-colors ${
                  step.isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
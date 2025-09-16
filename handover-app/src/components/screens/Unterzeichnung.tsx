import React from 'react';
import { useHandoverStep } from '../../hooks/useHandoverStep';

const Unterzeichnung: React.FC = () => {
  const { data: signatures, updateData } = useHandoverStep('signatures');


  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <h2 className="text-lg font-medium text-blue-500 mb-4 flex items-center">
        <div className="bg-blue-500 rounded-lg p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>
        Unterzeichnung
      </h2>
      {/* Content will be added later */}
    </div>
  );
};

export default Unterzeichnung;
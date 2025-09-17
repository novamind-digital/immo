import React from 'react';

const TransferModule: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Transferprotokoll</h1>
          <p className="text-xl text-gray-600 mb-8">
            Objektübergabe bei Verkauf und Ankauf von Immobilien
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-green-800 mb-2">Geplante Funktionen:</h3>
            <ul className="text-green-700 space-y-2 text-left max-w-md mx-auto">
              <li>• Verkäufer/Käufer-Datenerfassung</li>
              <li>• Objektzustand bei Verkauf</li>
              <li>• Schlüsselübergabe dokumentieren</li>
              <li>• Rechtliche Übergabedokumente</li>
              <li>• Foto-Dokumentation</li>
            </ul>
          </div>
          <div className="mt-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              In Entwicklung
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModule;
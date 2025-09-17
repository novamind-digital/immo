import React from 'react';

const DocumentsModule: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Dokumentenanfrage</h1>
          <p className="text-xl text-gray-600 mb-8">
            Behördliche Dokumente für Kaufabwicklung verwalten
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Geplante Funktionen:</h3>
            <ul className="text-purple-700 space-y-2 text-left max-w-md mx-auto">
              <li>• Grundbuchauszug anfragen</li>
              <li>• Energieausweis beantragen</li>
              <li>• Baugenehmigungen verwalten</li>
              <li>• Dokumenten-Status verfolgen</li>
              <li>• Automatische Behörden-Kommunikation</li>
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

export default DocumentsModule;
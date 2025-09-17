import React from 'react';

const TenancyModule: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.1 2.1 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Mietende</h1>
          <p className="text-xl text-gray-600 mb-8">
            Mietverträge und außerordentliche Kündigungen verwalten
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-orange-800 mb-2">Geplante Funktionen:</h3>
            <ul className="text-orange-700 space-y-2 text-left max-w-md mx-auto">
              <li>• Mietvertrag-Datenbank</li>
              <li>• Außerordentliche Kündigungen</li>
              <li>• Sanierungsplanung</li>
              <li>• Kündigungsfristen verwalten</li>
              <li>• Rechtliche Compliance</li>
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

export default TenancyModule;
import React from 'react';
import { NAVIGATION_ITEMS, MODULE_COLORS, type AppModule } from '../../types/navigation';

interface MainNavigationProps {
  currentModule: AppModule;
  onModuleChange: (module: AppModule) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ currentModule, onModuleChange }) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      case 'transfer':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        );
      case 'contract':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.1 2.1 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {NAVIGATION_ITEMS.map((item) => {
            const colors = MODULE_COLORS[item.color as keyof typeof MODULE_COLORS];
            const isActive = currentModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`p-6 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? `${colors.bg} text-white shadow-lg scale-105`
                    : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${
                    isActive ? 'bg-white bg-opacity-20' : colors.bgLight
                  }`}>
                    {getIcon(item.icon)}
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isActive ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${
                  isActive ? 'text-white text-opacity-90' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
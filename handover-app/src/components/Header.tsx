import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NAVIGATION_ITEMS, type AppModule } from '../types/navigation';

interface HeaderProps {
  title?: string;
  currentModule?: AppModule;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title,
  currentModule,
  onToggleSidebar
}) => {
  const { state } = useAuth();

  const getModuleTitle = () => {
    if (title) return title;
    if (currentModule) {
      const module = NAVIGATION_ITEMS.find(item => item.id === currentModule);
      return module?.title || 'Immobilien App';
    }
    return 'Immobilien App';
  };


  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Hamburger menu */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Center - Title */}
        <h1 className="text-lg font-semibold text-gray-600 truncate mx-4 flex-1 text-center">
          {getModuleTitle()}
        </h1>

        {/* Right side - Info button */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            i
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
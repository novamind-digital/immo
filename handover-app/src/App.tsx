import { useState, useEffect } from 'react';
import { useHandover } from './context/HandoverContext';
import { useAuth } from './context/AuthContext';
import { handoverService } from './services/handoverService';
import AuthContainer from './components/auth/AuthContainer';
import Header from './components/Header';
import Sidebar from './components/navigation/Sidebar';
import HandoverModule from './components/modules/HandoverModule';
import TransferModule from './components/modules/TransferModule';
import DocumentsModule from './components/modules/DocumentsModule';
import TenancyModule from './components/modules/TenancyModule';
import ProgressIndicatorSimple from './components/ProgressIndicatorSimple';
import SimpleForm from './components/SimpleForm';
import AngabenZumMietobjekt from './components/screens/AngabenZumMietobjekt';
import ZustandDesMietobjekts from './components/screens/ZustandDesMietobjekts';
import Zaehlererfassung from './components/screens/Zaehlererfassung';
import Schluesseluebergabe from './components/screens/Schluesseluebergabe';
import BilderZumMietobjekt from './components/screens/BilderZumMietobjekt';
import SonstigeVereinbarungen from './components/screens/SonstigeVereinbarungen';
import Unterzeichnung from './components/screens/Unterzeichnung';
import Protokollversand from './components/screens/Protokollversand';
import { HANDOVER_STEPS } from './constants/steps';
import type { AppModule } from './types/navigation';

type AppView = 'modules' | 'handover-form';

function App() {
  const { saveHandover, createNewHandover } = useHandover();
  const { state: authState } = useAuth();
  
  const [currentView, setCurrentView] = useState<AppView>('modules');
  const [currentModule, setCurrentModule] = useState<AppModule>('handover');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(() => {
    // Load saved step from localStorage on initial load
    const saved = localStorage.getItem('handover_currentStep');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Update handover service when user changes
  useEffect(() => {
    if (authState.user) {
      handoverService.setCurrentUser(authState.user.uid);
    } else {
      handoverService.setCurrentUser(null);
    }
  }, [authState.user]);
  
  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('handover_currentStep', currentStep.toString());
  }, [currentStep]);

  // Show loading screen while auth is initializing
  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Wird geladen...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if user is not authenticated
  if (!authState.isAuthenticated) {
    return <AuthContainer />;
  }

  const handleCreateNewHandover = () => {
    createNewHandover();
    setCurrentStep(0);
    setCurrentView('handover-form');
  };

  const handleOpenHandover = async (handoverId: string) => {
    try {
      // Load the handover data
      // TODO: Implement loadHandover function if needed
      console.log('Opening handover:', handoverId);
      setCurrentView('handover-form');
    } catch (error) {
      console.error('Error opening handover:', error);
    }
  };

  const handleShowModules = () => {
    setCurrentView('modules');
  };

  const handleModuleChange = (module: AppModule) => {
    setCurrentModule(module);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleStepClick = async (stepIndex: number) => {
    // Auto-save before switching steps
    await saveHandover();
    setCurrentStep(stepIndex);
  };

  const handlePrevious = async () => {
    if (currentStep > 0) {
      // Auto-save before switching steps
      await saveHandover();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (currentStep < 8) {  // Normal navigation through steps
      // Auto-save before switching steps
      await saveHandover();
      setCurrentStep(currentStep + 1);
    }
    // Note: Step 8 is the final step (Protokollversand), no next step needed
  };

  // Show modules overview if current view is modules
  if (currentView === 'modules') {
    const renderCurrentModule = () => {
      switch (currentModule) {
        case 'handover':
          return (
            <HandoverModule
              onCreateNew={handleCreateNewHandover}
              onOpenHandover={handleOpenHandover}
            />
          );
        case 'transfer':
          return <TransferModule />;
        case 'documents':
          return <DocumentsModule />;
        case 'tenancy':
          return <TenancyModule />;
        default:
          return (
            <HandoverModule
              onCreateNew={handleCreateNewHandover}
              onOpenHandover={handleOpenHandover}
            />
          );
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentModule={currentModule}
          onToggleSidebar={handleToggleSidebar}
        />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          currentModule={currentModule}
          onModuleChange={handleModuleChange}
        />
        {renderCurrentModule()}
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="max-w-4xl mx-auto px-4 py-4">
            <SimpleForm />
          </div>
        );
      case 1:
        return <AngabenZumMietobjekt />;
      case 2:
        return <ZustandDesMietobjekts />;
      case 3:
        return <Zaehlererfassung />;
      case 4:
        return <Schluesseluebergabe />;
      case 5:
        return <BilderZumMietobjekt />;
      case 6:
        return <SonstigeVereinbarungen />;
      case 7:
        return <Unterzeichnung />;
      case 8:
        return <Protokollversand />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-4 py-4">
            <SimpleForm />
          </div>
        );
    }
  };
  
  // Show handover form with header and navigation
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Wohnungsübergabe"
        onToggleSidebar={handleToggleSidebar}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        currentModule={currentModule}
        onModuleChange={handleModuleChange}
      />
      <ProgressIndicatorSimple 
        steps={HANDOVER_STEPS} 
        currentStep={currentStep} 
        onStepClick={handleStepClick}
      />
      {renderCurrentScreen()}
      
      {/* Navigation Buttons */}
      <div className="w-full px-4 py-4">
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="w-1/2 px-6 py-3 rounded-xl font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Zurück
            </button>
          )}
          {currentStep < 8 && (
            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-xl font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 ${
                currentStep === 0 ? 'w-full' : 'w-1/2'
              }`}
            >
              Weiter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

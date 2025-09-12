import React, { useState } from 'react';
import Header from './components/Header';
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

const steps = [
  { id: 1, title: 'Allgemein', icon: '📋', isCompleted: false, isActive: true },
  { id: 2, title: 'Mietobjekt', icon: '🏠', isCompleted: false, isActive: false },
  { id: 3, title: 'Zustand', icon: '🔍', isCompleted: false, isActive: false },
  { id: 4, title: 'Zähler', icon: '⚡', isCompleted: false, isActive: false },
  { id: 5, title: 'Schlüssel', icon: '🔑', isCompleted: false, isActive: false },
  { id: 6, title: 'Bilder', icon: '📷', isCompleted: false, isActive: false },
  { id: 7, title: 'Vereinbarungen', icon: '📝', isCompleted: false, isActive: false },
  { id: 8, title: 'Unterzeichnung', icon: '✍️', isCompleted: false, isActive: false },
  { id: 9, title: 'Protokollversand', icon: '📤', isCompleted: false, isActive: false },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="max-w-4xl mx-auto px-4 py-6">
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
          <div className="max-w-4xl mx-auto px-4 py-6">
            <SimpleForm />
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressIndicatorSimple 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick}
      />
      {renderCurrentScreen()}
      
      {/* Navigation Buttons */}
      <div className="w-full px-4 py-6">
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="w-1/2 px-6 py-3 rounded-xl font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Zurück
            </button>
          )}
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-xl font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 ${
              currentStep === 0 ? 'w-full' : 'w-1/2'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Abschließen' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

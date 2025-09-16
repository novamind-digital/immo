import { useState } from 'react';
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
    if (currentStep < HANDOVER_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

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
  
  return (
    <div className="min-h-screen bg-gray-50">
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
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-xl font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 ${
              currentStep === 0 ? 'w-full' : 'w-1/2'
            }`}
          >
            {currentStep === HANDOVER_STEPS.length - 1 ? 'Abschließen' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

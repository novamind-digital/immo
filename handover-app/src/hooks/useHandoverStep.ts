import { useCallback, useEffect } from 'react';
import { useHandover } from '../context/HandoverContext';
import type { HandoverData, HandoverScheduling } from '../types/handover';

// Define step keys for type safety
export type StepKey = 'general' | 'property' | 'condition' | 'scheduling' | 'meters' | 'keys' | 'photos' | 'agreements' | 'signatures';

// Step-specific data types
export type StepData<T extends StepKey> = T extends 'general' 
  ? HandoverData['general']
  : T extends 'property'
  ? HandoverData['property']
  : T extends 'condition'
  ? HandoverData['condition']
  : T extends 'scheduling'
  ? HandoverScheduling
  : T extends 'meters'
  ? HandoverData['meters']
  : T extends 'keys'
  ? HandoverData['keys']
  : T extends 'photos'
  ? HandoverData['photos']
  : T extends 'agreements'
  ? HandoverData['agreements']
  : T extends 'signatures'
  ? HandoverData['signatures']
  : never;

// Hook return type
interface UseHandoverStepReturn<T extends StepKey> {
  data: StepData<T>;
  updateData: (updates: Partial<StepData<T>>) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;
}

// Local storage key generator
const getLocalStorageKey = (stepKey: StepKey) => `handover_${stepKey}`;

/**
 * Custom hook for managing step-specific handover data
 * @param stepKey - The key identifying which step data to manage
 * @returns Step-specific data and update functions
 */
export const useHandoverStep = <T extends StepKey>(stepKey: T): UseHandoverStepReturn<T> => {
  const { 
    state, 
    updateGeneral, 
    updateProperty, 
    updateCondition,
    updateScheduling,
    updateSignatures,
    setMeters,
    setKeys,
    setPhotos,
    setAgreements
  } = useHandover();

  // Get the current data for this step
  const data = (stepKey === 'scheduling' ? state.data.scheduling || {} : state.data[stepKey]) as StepData<T>;

  // Create update function based on step type
  const updateData = useCallback((updates: Partial<StepData<T>>) => {
    switch (stepKey) {
      case 'general':
        updateGeneral(updates as Partial<HandoverData['general']>);
        break;
      case 'property':
        updateProperty(updates as Partial<HandoverData['property']>);
        break;
      case 'condition':
        updateCondition(updates as Partial<HandoverData['condition']>);
        break;
      case 'scheduling':
        updateScheduling(updates as Partial<HandoverScheduling>);
        break;
      case 'signatures':
        updateSignatures(updates as Partial<HandoverData['signatures']>);
        break;
      case 'meters':
        if (Array.isArray(updates)) {
          setMeters(updates as HandoverData['meters']);
        }
        break;
      case 'keys':
        if (Array.isArray(updates)) {
          setKeys(updates as HandoverData['keys']);
        }
        break;
      case 'photos':
        if (Array.isArray(updates)) {
          setPhotos(updates as HandoverData['photos']);
        }
        break;
      case 'agreements':
        if (Array.isArray(updates)) {
          setAgreements(updates as HandoverData['agreements']);
        }
        break;
    }
  }, [stepKey, updateGeneral, updateProperty, updateCondition, updateScheduling, updateSignatures, setMeters, setKeys, setPhotos, setAgreements]);

  // Save current step data to localStorage
  const saveToLocalStorage = useCallback(() => {
    try {
      const key = getLocalStorageKey(stepKey);
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem('handover_lastSaved', new Date().toISOString());
    } catch (error) {
      console.warn(`Failed to save ${stepKey} data to localStorage:`, error);
    }
  }, [stepKey, data]);

  // Load step data from localStorage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const key = getLocalStorageKey(stepKey);
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        updateData(parsedData);
      }
    } catch (error) {
      console.warn(`Failed to load ${stepKey} data from localStorage:`, error);
    }
  }, [stepKey, updateData]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (state.isDirty) {
      const timer = setTimeout(() => {
        saveToLocalStorage();
      }, 1000); // Debounce saves by 1 second

      return () => clearTimeout(timer);
    }
  }, [data, state.isDirty, saveToLocalStorage]);

  // Load from localStorage on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []); // Only run on mount

  return {
    data,
    updateData,
    saveToLocalStorage,
    loadFromLocalStorage,
    isLoading: state.loading,
    error: state.error,
    isDirty: state.isDirty,
  };
};

// Utility hook for array-based steps (meters, keys, photos, agreements)
export const useHandoverArrayStep = <T extends 'meters' | 'keys' | 'photos' | 'agreements'>(
  stepKey: T
) => {
  const { data, updateData, ...rest } = useHandoverStep(stepKey);
  
  const addItem = useCallback((item: StepData<T>[0]) => {
    const currentArray = data as StepData<T>;
    updateData([...currentArray, item] as StepData<T>);
  }, [data, updateData]);
  
  const removeItem = useCallback((index: number) => {
    const currentArray = data as StepData<T>;
    const newArray = currentArray.filter((_, i) => i !== index);
    updateData(newArray as StepData<T>);
  }, [data, updateData]);
  
  const updateItem = useCallback((index: number, updates: Partial<StepData<T>[0]>) => {
    const currentArray = data as StepData<T>;
    const newArray = currentArray.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    );
    updateData(newArray as StepData<T>);
  }, [data, updateData]);
  
  return {
    data,
    updateData,
    addItem,
    removeItem,
    updateItem,
    ...rest
  };
};

// Utility function to clear all localStorage data
export const clearHandoverLocalStorage = () => {
  const stepKeys: StepKey[] = ['general', 'property', 'condition', 'scheduling', 'meters', 'keys', 'photos', 'agreements', 'signatures'];
  stepKeys.forEach(stepKey => {
    localStorage.removeItem(getLocalStorageKey(stepKey));
  });
  localStorage.removeItem('handover_lastSaved');
  localStorage.removeItem('handover_currentStep');
};

// Utility function to check if there's saved data
export const hasSavedHandoverData = (): boolean => {
  return localStorage.getItem('handover_lastSaved') !== null;
};
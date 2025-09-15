import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { HandoverData, PartialHandoverData, Tenant, Defect, Meter, Key, Photo, Agreement } from '../types/handover';
import { handoverService } from '../services/handoverService';

// Action types
type HandoverAction = 
  | { type: 'SET_HANDOVER_DATA'; payload: HandoverData }
  | { type: 'UPDATE_GENERAL'; payload: Partial<HandoverData['general']> }
  | { type: 'UPDATE_PROPERTY'; payload: Partial<HandoverData['property']> }
  | { type: 'UPDATE_CONDITION'; payload: Partial<HandoverData['condition']> }
  | { type: 'SET_METERS'; payload: Meter[] }
  | { type: 'SET_KEYS'; payload: Key[] }
  | { type: 'SET_PHOTOS'; payload: Photo[] }
  | { type: 'SET_AGREEMENTS'; payload: Agreement[] }
  | { type: 'UPDATE_SIGNATURES'; payload: Partial<HandoverData['signatures']> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

// State type
interface HandoverState {
  data: HandoverData;
  loading: boolean;
  error: string | null;
  isDirty: boolean;
}

// Context type
interface HandoverContextType {
  state: HandoverState;
  // General actions
  updateGeneral: (data: Partial<HandoverData['general']>) => void;
  updateProperty: (data: Partial<HandoverData['property']>) => void;
  updateCondition: (data: Partial<HandoverData['condition']>) => void;
  updateSignatures: (data: Partial<HandoverData['signatures']>) => void;
  
  // Array item actions
  setMeters: (meters: Meter[]) => void;
  setKeys: (keys: Key[]) => void;
  setPhotos: (photos: Photo[]) => void;
  setAgreements: (agreements: Agreement[]) => void;
  
  // Firebase operations
  saveHandover: () => Promise<string | null>;
  loadHandover: (id: string) => Promise<void>;
  createNewHandover: () => void;
  
  // Utility
  resetForm: () => void;
}

// Default state
const createDefaultHandoverData = (): HandoverData => ({
  meta: {
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    version: 1
  },
  general: {
    rentalType: 'start',
    rentalDate: '',
    manager: {
      type: 'verwalter',
      selectedId: '',
    },
    tenants: [{
      id: Date.now(),
      type: 'person',
      title: 'herr',
      firstName: '',
      lastName: '',
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      present: 'ja',
    }]
  },
  property: {
    selectedAddress: '',
    propertyType: '',
    selectedFloors: []
  },
  condition: {
    overallCondition: 'erstbezug',
    cleanlinessConditions: [],
    defects: []
  },
  meters: [],
  keys: [],
  photos: [],
  agreements: [],
  signatures: {
    date: new Date().toLocaleDateString('de-DE'),
    location: '',
    landlord: { name: '' },
    tenants: []
  }
});

const initialState: HandoverState = {
  data: createDefaultHandoverData(),
  loading: false,
  error: null,
  isDirty: false
};

// Reducer
const handoverReducer = (state: HandoverState, action: HandoverAction): HandoverState => {
  switch (action.type) {
    case 'SET_HANDOVER_DATA':
      return {
        ...state,
        data: action.payload,
        isDirty: false
      };
      
    case 'UPDATE_GENERAL':
      return {
        ...state,
        data: {
          ...state.data,
          general: { ...state.data.general, ...action.payload }
        },
        isDirty: true
      };
      
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        data: {
          ...state.data,
          property: { ...state.data.property, ...action.payload }
        },
        isDirty: true
      };
      
    case 'UPDATE_CONDITION':
      return {
        ...state,
        data: {
          ...state.data,
          condition: { ...state.data.condition, ...action.payload }
        },
        isDirty: true
      };
      
    case 'SET_METERS':
      return {
        ...state,
        data: { ...state.data, meters: action.payload },
        isDirty: true
      };
      
    case 'SET_KEYS':
      return {
        ...state,
        data: { ...state.data, keys: action.payload },
        isDirty: true
      };
      
    case 'SET_PHOTOS':
      return {
        ...state,
        data: { ...state.data, photos: action.payload },
        isDirty: true
      };
      
    case 'SET_AGREEMENTS':
      return {
        ...state,
        data: { ...state.data, agreements: action.payload },
        isDirty: true
      };
      
    case 'UPDATE_SIGNATURES':
      return {
        ...state,
        data: {
          ...state.data,
          signatures: { ...state.data.signatures, ...action.payload }
        },
        isDirty: true
      };
      
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload };
      
    case 'RESET':
      return {
        ...initialState,
        data: createDefaultHandoverData()
      };
      
    default:
      return state;
  }
};

// Context
const HandoverContext = createContext<HandoverContextType | undefined>(undefined);

// Provider component
export const HandoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(handoverReducer, initialState);

  const updateGeneral = useCallback((data: Partial<HandoverData['general']>) => {
    dispatch({ type: 'UPDATE_GENERAL', payload: data });
  }, []);

  const updateProperty = useCallback((data: Partial<HandoverData['property']>) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: data });
  }, []);

  const updateCondition = useCallback((data: Partial<HandoverData['condition']>) => {
    dispatch({ type: 'UPDATE_CONDITION', payload: data });
  }, []);

  const updateSignatures = useCallback((data: Partial<HandoverData['signatures']>) => {
    dispatch({ type: 'UPDATE_SIGNATURES', payload: data });
  }, []);

  const setMeters = useCallback((meters: Meter[]) => {
    dispatch({ type: 'SET_METERS', payload: meters });
  }, []);

  const setKeys = useCallback((keys: Key[]) => {
    dispatch({ type: 'SET_KEYS', payload: keys });
  }, []);

  const setPhotos = useCallback((photos: Photo[]) => {
    dispatch({ type: 'SET_PHOTOS', payload: photos });
  }, []);

  const setAgreements = useCallback((agreements: Agreement[]) => {
    dispatch({ type: 'SET_AGREEMENTS', payload: agreements });
  }, []);

  const saveHandover = useCallback(async (): Promise<string | null> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      // If it's a new handover (no meta.id), create it
      if (!state.data.meta || !(state.data.meta as any).id) {
        const { meta, ...dataWithoutMeta } = state.data;
        const id = await handoverService.createHandover(dataWithoutMeta);
        
        // Update the state with the new ID
        dispatch({ 
          type: 'SET_HANDOVER_DATA', 
          payload: { 
            ...state.data, 
            meta: { ...state.data.meta, id } as any 
          } 
        });
        
        return id;
      } else {
        // Update existing handover
        const handoverId = (state.data.meta as any).id;
        await handoverService.updateHandover(handoverId, state.data);
        return handoverId;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Speichern der Übergabe' });
      console.error('Error saving handover:', error);
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.data]);

  const loadHandover = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const data = await handoverService.getHandover(id);
      if (data) {
        dispatch({ type: 'SET_HANDOVER_DATA', payload: { ...data, meta: { ...data.meta, id } as any } });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Übergabe nicht gefunden' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Laden der Übergabe' });
      console.error('Error loading handover:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createNewHandover = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const contextValue: HandoverContextType = {
    state,
    updateGeneral,
    updateProperty,
    updateCondition,
    updateSignatures,
    setMeters,
    setKeys,
    setPhotos,
    setAgreements,
    saveHandover,
    loadHandover,
    createNewHandover,
    resetForm,
  };

  return (
    <HandoverContext.Provider value={contextValue}>
      {children}
    </HandoverContext.Provider>
  );
};

// Hook to use the context
export const useHandover = (): HandoverContextType => {
  const context = useContext(HandoverContext);
  if (context === undefined) {
    throw new Error('useHandover must be used within a HandoverProvider');
  }
  return context;
};
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { handoverService } from '../../services/handoverService';
import { Button, Card, StatCard } from '../shared';
import Calendar from '../calendar/Calendar';
import UpcomingEvents from '../calendar/UpcomingEvents';
import ReminderNotification from '../ReminderNotification';
import { useReminders, useNotificationPermission } from '../../hooks/useReminders';
import { createTestHandovers } from '../../utils/createTestHandovers';
import type { HandoverData } from '../../types/handover';

interface HandoverModuleProps {
  onCreateNew: () => void;
  onOpenHandover: (id: string) => void;
}

const HandoverModule: React.FC<HandoverModuleProps> = ({ onCreateNew, onOpenHandover }) => {
  const { state: authState } = useAuth();
  const [handovers, setHandovers] = useState<(HandoverData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  
  // Reminder system
  const { reminders, dismissReminder } = useReminders(handovers);
  const { requestPermission, showNotification, permission } = useNotificationPermission();

  useEffect(() => {
    const loadHandovers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Ensure HandoverService has the current user before making queries
        if (authState.user) {
          handoverService.setCurrentUser(authState.user.uid);
        }
        
        const userHandovers = await handoverService.getAllHandovers();
        
        // Test-Termine hinzufügen (temporär für Demo)
        const testHandovers = createTestHandovers();
        const combinedHandovers = [...userHandovers, ...testHandovers];
        
        setHandovers(combinedHandovers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Übergaben');
      } finally {
        setLoading(false);
      }
    };

    if (authState.user) {
      loadHandovers();
    }
  }, [authState.user]);

  // Request notification permission on mount
  useEffect(() => {
    if (permission === 'default') {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Show browser notifications for new reminders
  useEffect(() => {
    reminders.forEach(reminder => {
      if (permission === 'granted') {
        const title = reminder.type === 'overdue' 
          ? 'Überfälliger Übergabetermin'
          : 'Anstehender Übergabetermin';
        
        const body = `${reminder.handover.property.selectedAddress || 'Adresse nicht angegeben'} - ${reminder.timeUntil}`;
        
        showNotification(title, {
          body,
          icon: '/handover-icon.png', // You might want to add an icon
          tag: reminder.id, // Prevents duplicate notifications
          requireInteraction: reminder.type === 'overdue'
        });
      }
    });
  }, [reminders, permission, showNotification]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Abgeschlossen';
      case 'draft':
        return 'Entwurf';
      case 'archived':
        return 'Archiviert';
      default:
        return 'Unbekannt';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Lade Übergaben...</p>
        </div>
      </div>
    );
  }

  const handleReminderOpenHandover = (handover: (HandoverData & { id: string })) => {
    onOpenHandover(handover.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reminder Notifications */}
      <ReminderNotification
        reminders={reminders}
        onDismiss={dismissReminder}
        onOpenHandover={handleReminderOpenHandover}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Simplified header with view toggle and action button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Liste
              </div>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5a2.25 2.25 0 002.25 2.25v7.5" />
                </svg>
                Kalender
              </div>
            </button>
          </div>
          
          {/* Action button */}
          <Button onClick={onCreateNew} className="shadow-lg">
            Übergabe starten
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* Content based on view mode */}
        {viewMode === 'calendar' ? (
          <div className="space-y-8">
            {/* Upcoming Events */}
            <UpcomingEvents 
              handovers={handovers}
              onEventClick={onOpenHandover}
              maxEvents={3}
            />
            
            {/* Calendar */}
            <Calendar 
              handovers={handovers}
              onEventClick={onOpenHandover}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="mb-8">
              <StatCard
                title="In Bearbeitung"
                value={handovers.filter(h => h.meta.status === 'draft').length}
                color="yellow"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            {/* Handovers List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Ihre Übergaben</h2>
              </div>
              {handovers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Noch keine Übergaben vorhanden.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {handovers.map((handover) => (
                    <div
                      key={handover.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onOpenHandover(handover.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900 mr-3">
                              {handover.property.selectedAddress || 'Adresse nicht angegeben'}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(handover.meta.status)}`}>
                              {getStatusText(handover.meta.status)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="mr-4">
                              {handover.general.rentalType === 'start' ? 'Einzug' : 'Auszug'}
                            </span>
                            <span className="mr-4">
                              Erstellt: {formatDate(handover.meta.createdAt)}
                            </span>
                            {handover.meta.updatedAt && (
                              <span>
                                Aktualisiert: {formatDate(handover.meta.updatedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandoverModule;
import React from 'react';
import type { HandoverData } from '../../types/handover';

interface UpcomingEventsProps {
  handovers: (HandoverData & { id: string })[];
  onEventClick?: (handover: HandoverData & { id: string }) => void;
  maxEvents?: number;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  handovers, 
  onEventClick, 
  maxEvents = 5 
}) => {
  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);
  
  // Filter and sort upcoming handovers
  const upcomingHandovers = handovers
    .filter(handover => {
      if (!handover.scheduling?.scheduledDate) return false;
      const scheduledDate = new Date(handover.scheduling.scheduledDate);
      return scheduledDate >= today && scheduledDate <= oneWeekFromNow;
    })
    .sort((a, b) => {
      const dateA = new Date(a.scheduling!.scheduledDate!);
      const dateB = new Date(b.scheduling!.scheduledDate!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, maxEvents);
  
  const formatDate = (date: Date) => {
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    const isTomorrow = date.getDate() === today.getDate() + 1 && 
                       date.getMonth() === today.getMonth() && 
                       date.getFullYear() === today.getFullYear();
    
    if (isToday) return 'Heute';
    if (isTomorrow) return 'Morgen';
    
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };
  
  const getUrgencyColor = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'border-red-200 bg-red-50'; // Today
    if (diffDays === 1) return 'border-orange-200 bg-orange-50'; // Tomorrow
    return 'border-blue-200 bg-blue-50'; // Later
  };
  
  if (upcomingHandovers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Anstehende Termine</h3>
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5a2.25 2.25 0 002.25 2.25v7.5" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Keine Termine in den nächsten 7 Tagen</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Anstehende Termine</h3>
        <p className="text-sm text-gray-600">Nächste 7 Tage</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {upcomingHandovers.map((handover) => {
          const scheduledDate = new Date(handover.scheduling!.scheduledDate!);
          const urgencyColor = getUrgencyColor(scheduledDate);
          
          return (
            <div
              key={handover.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${urgencyColor}`}
              onClick={() => onEventClick?.(handover)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">
                      {handover.general.rentalType === 'start' ? '📥' : '📤'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {handover.property.selectedAddress || 'Adresse nicht angegeben'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {handover.general.rentalType === 'start' ? 'Einzugsübergabe' : 'Auszugsübergabe'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5a2.25 2.25 0 002.25 2.25v7.5" />
                    </svg>
                    <span className="mr-3">{formatDate(scheduledDate)}</span>
                    
                    {handover.scheduling?.scheduledTime && (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="mr-3">{handover.scheduling.scheduledTime}</span>
                      </>
                    )}
                    
                    {handover.scheduling?.estimatedDuration && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {Math.round(handover.scheduling.estimatedDuration / 60)}h
                      </span>
                    )}
                  </div>
                  
                  {handover.scheduling?.participantNames && handover.scheduling.participantNames.length > 0 && (
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {handover.scheduling.participantNames.slice(0, 2).join(', ')}
                      {handover.scheduling.participantNames.length > 2 && (
                        <span> +{handover.scheduling.participantNames.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {handovers.filter(h => h.scheduling?.scheduledDate).length > maxEvents && (
        <div className="p-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-600">
            +{handovers.filter(h => h.scheduling?.scheduledDate).length - maxEvents} weitere Termine
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
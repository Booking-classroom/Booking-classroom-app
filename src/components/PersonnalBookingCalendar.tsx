import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { ReservationType } from '../types/reservation.type';
import { updateReservation, removeReservation } from '../service/reservation.service';

interface BookingCalendarProps {
  userId: string;
  reservations: ReservationType[];
}

const PersonnalBookingCalendar: React.FC<BookingCalendarProps> = ({
  userId,
  reservations,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const newCalendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        locale: 'fr',
        slotDuration: '00:30:00',
        slotLabelInterval: '00:30',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        height: 'auto',
        firstDay: 1,
        weekends: true,
        timeZone: 'UTC',  
        events: reservations.map((reservation) => ({
          title: reservation.etat + ' - en ' + (typeof reservation.classroom === 'string' ? reservation.classroom : reservation.classroom.name),
          start: new Date(reservation.start_datetime),
          end: new Date(reservation.end_datetime),
          className: 'owned-slot',
          editable: true,
          isOwner: true,
          id: reservation.id,
        })),
        selectable: true,
        eventClick: async (info) => {
          if (info.event.extendedProps.isOwner) {
            const confirmation = window.confirm('Voulez-vous vraiment supprimer cette réservation ?');
            if (confirmation) {
              try {
                await removeReservation(info.event.id);
                info.event.remove();
                alert('Réservation supprimée avec succès.');
              } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Une erreur est survenue lors de la suppression.');
              }
            }
          }
        },
        eventDrop: async (info) => {
          if (info.event.extendedProps.isOwner) {
            const confirmation = window.confirm('Voulez-vous vraiment modifier cette réservation ?');
            if (confirmation) {
              try {
                const updatedReservation = {
                  start_datetime: info.event.start?.toISOString(),
                  end_datetime: info.event.end?.toISOString(),
                  user: userId,
                  classroom: info.event.extendedProps.classroom,
                  etat: 'confirmée',
                };
                await updateReservation(info.event.id, updatedReservation);
                alert('Réservation modifiée avec succès.');
              } catch (error) {
                console.error('Erreur lors de la modification:', error);
                alert('Une erreur est survenue lors de la modification.');
                info.revert();
              }
            } else {
              info.revert();
            }
          }
        },
        selectOverlap: false,
      });
      newCalendar.render();
    }
  }, [reservations, userId]);

  return <div ref={calendarRef}></div>;
};

export default PersonnalBookingCalendar;
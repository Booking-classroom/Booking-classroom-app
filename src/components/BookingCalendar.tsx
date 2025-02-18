import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { findByClassroomId } from '../service/reservation.service';
import { ReservationType } from '../types/reservation.type';
import { updateReservation, removeReservation } from '../service/reservation.service';

interface BookingCalendarProps {
  id: string;
  selectedSlots: { start: Date; end: Date }[];
  setSelectedSlots: React.Dispatch<React.SetStateAction<{ start: Date; end: Date }[]>>;
  onSelectSlot: (slot: { start: Date; end: Date } | null) => void;
  userId: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  id,
  selectedSlots,
  setSelectedSlots,
  onSelectSlot,
  userId,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  // Récupération des réservations existantes
  useEffect(() => {
    const fetchReservations = async () => {
      const data = await findByClassroomId(id);
      setReservations(data);
    };
    fetchReservations();
  }, [id]);

  // Gestion de l'affichage et de la sélection des créneaux dans le calendrier
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
        events: [
          ...reservations.map((reservation) => ({
            title: reservation.etat,
            start: new Date(reservation.start_datetime),
            end: new Date(reservation.end_datetime),
            className: typeof reservation.user === 'object' && reservation.user.id === userId ? 'owned-slot' : '',
            editable: typeof reservation.user === 'object' && reservation.user.id === userId,
            isOwner: typeof reservation.user === 'object' && reservation.user.id === userId,
            id: reservation.id,
          })),
          ...selectedSlots.map((slot) => ({
            title: 'Selected',
            start: slot.start,
            end: slot.end,
            className: 'selected-slot',
          })),
        ],
        selectable: true,
        select: (info) => {
          const newSlot = { start: info.start, end: info.end };

          // Vérification pour savoir si le créneau est déjà sélectionné
          const isAlreadySelected = selectedSlots.some(
            (slot) =>
              slot.start.getTime() === newSlot.start.getTime() &&
              slot.end.getTime() === newSlot.end.getTime()
          );

          if (isAlreadySelected) {
            // Si déjà sélectionné, désélectionner
            const updatedSlots = selectedSlots.filter(
              (slot) =>
                slot.start.getTime() !== newSlot.start.getTime() ||
                slot.end.getTime() !== newSlot.end.getTime()
            );
            setSelectedSlots(updatedSlots);  // Mettre à jour l'état des créneaux sélectionnés
            onSelectSlot(null);  // Appel de la fonction de désélection
          } else {
            // Sinon, ajouter à la sélection
            onSelectSlot(newSlot);  // Appel de la fonction de sélection
          }
        },
        eventClick: async (info) => {
            if (info.event.title === 'Selected') {
              info.event.remove();
  
              const updatedSlots = selectedSlots.filter(
                (slot) =>
                  slot.start.getTime() !== info.event.start?.getTime() ||
                  slot.end.getTime() !== info.event.end?.getTime()
              );
              setSelectedSlots(updatedSlots);
              onSelectSlot(null);
            }
          
          if (info.event.extendedProps.isOwner) {
            const confirmation = window.confirm('Voulez-vous vraiment supprimer cette réservation ?');
            if (confirmation) {
              try {
                // Suppression de la réservation
                await removeReservation(info.event.id);
                info.event.remove();  // Suppression visuelle
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
                // Mise à jour de la réservation
                const updatedReservation = {
                  start_datetime: info.event.start?.toISOString(),
                  end_datetime: info.event.end?.toISOString(),
                  user: userId,
                  classroom: id,
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
        
        selectOverlap: false,  // Empêche la superposition de sélection
      });
      newCalendar.render();
    }
  }, [reservations, selectedSlots, onSelectSlot, userId]);

  return <div ref={calendarRef}></div>;
};

export default BookingCalendar;

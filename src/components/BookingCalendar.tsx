import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { findByClassroomId } from '../service/reservation.service';
import { ReservationType } from '../types/reservation.type';

interface BookingCalendarProps {
  id: string;
  selectedSlots: { start: Date; end: Date }[];
  setSelectedSlots: React.Dispatch<React.SetStateAction<{ start: Date; end: Date }[]>>;
  onSelectSlot: (slot: { start: Date; end: Date } | null) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  id,
  selectedSlots,
  setSelectedSlots,
  onSelectSlot,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await findByClassroomId(id);
      setReservations(data);
    };
    fetchReservations();
  }, [id]);

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

          const isAlreadySelected = selectedSlots.some(
            (slot) =>
              slot.start.getTime() === newSlot.start.getTime() &&
              slot.end.getTime() === newSlot.end.getTime()
          );

          if (isAlreadySelected) {
            const updatedSlots = selectedSlots.filter(
              (slot) =>
                slot.start.getTime() !== newSlot.start.getTime() ||
                slot.end.getTime() !== newSlot.end.getTime()
            );
            setSelectedSlots(updatedSlots);
            onSelectSlot(null);
          } else {
            setSelectedSlots([...selectedSlots, newSlot]);
            onSelectSlot(newSlot);
          }
        },
        eventClick: (info) => {
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
        },
        selectOverlap: false,
      });
      newCalendar.render();
    }
  }, [reservations, selectedSlots, onSelectSlot]);

  return <div ref={calendarRef}></div>;
};

export default BookingCalendar;

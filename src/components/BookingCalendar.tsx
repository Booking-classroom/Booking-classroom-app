import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import { findByClassroomId } from '../service/reservation.service';
import { ReservationType } from '../types/reservation.type';

interface BookingCalendarProps {
  id: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ id }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  useEffect(() => {
    console.log('id : ', id)
    const fetchReservations = async () => {
      const data = await findByClassroomId(id);
      setReservations(data);
    };
    fetchReservations();
  }, [id]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin],
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
          title: reservation.etat,
          start: new Date(reservation.start_datetime),
          end: new Date(reservation.end_datetime),
        })),
      });
      calendar.render();
    }
  }, [reservations]);

  return <div ref={calendarRef}></div>;
};

export default BookingCalendar;
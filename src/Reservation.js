// src/Reservation.js
import { auth } from './firebase-config';
import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const Reservation = () => {
    const [spaceId, setSpaceId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleReservation = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'reservations'), {
                userId: auth.currentUser .uid,
                spaceId,
                date,
                time
            });
            alert('Reserva creada exitosamente');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
        }
    };

    return (
        <form onSubmit={handleReservation}>
            <input
                type="text"
                placeholder="ID del espacio"
                value={spaceId}
                onChange={(e) => setSpaceId(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Reservar</button>
        </form>
    );
};

export default Reservation;
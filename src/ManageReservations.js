// src/ManageReservations.js
import { auth } from './firebase-config';
import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        const userReservationsQuery = query(
            collection(db, 'reservations'),
            where('userId', '==', auth.currentUser .uid)
        );
        const reservationsSnapshot = await getDocs(userReservationsQuery);
        const reservationsList = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservations(reservationsList);

        const user = auth.currentUser ; // Obtén el usuario actual

    if (user) {
        const uid = user.uid; // Solo intenta acceder a uid si user no es null
        // Lógica para obtener reservas usando uid
    } else {
        console.log("No hay usuario autenticado.");
        // Maneja el caso donde no hay usuario autenticado
    }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'reservations', id));
        fetchReservations(); // Actualiza la lista después de eliminar
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div>
            <h2>Mis Reservas</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        Espacio: {reservation.spaceId} - Fecha: {reservation.date} - Hora: {reservation.time}
                        <button onClick={() => handleDelete(reservation.id)}>Cancelar Reserva</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageReservations;
// src/Spaces.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const Spaces = () => {
    const [spaces, setSpaces] = useState([]);

    const fetchSpaces = async () => {
        const spacesCollection = collection(db, 'spaces');
        const spacesSnapshot = await getDocs(spacesCollection);
        const spacesList = spacesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSpaces(spacesList);
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    return (
        <div>
            <h2>Espacios Disponibles</h2>
            <ul>
                {spaces.map(space => (
                    <li key={space.id}>
                        {space.name} - {space.location} (Capacidad: {space.capacity}) - {space.available ? 'Disponible' : 'No disponible'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Spaces;
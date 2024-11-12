// src/App.js
import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import Reservation from './Reservation';
import Spaces from './Spaces';
import ManageReservations from './ManageReservations';
import { auth } from './firebase-config';

const App = () => {

  const [user, setUser ] = useState(null); // Estado para almacenar el usuario

    useEffect(() => {
        // Suscribirse a los cambios en el estado de autenticación
        const unsubscribe = auth.onAuthStateChanged(currentUser  => {
            if (currentUser ) {
                setUser (currentUser ); // Si hay un usuario, actualiza el estado
            } else {
                setUser (null); // Si no hay usuario, establece el estado a null
            }
        });

        // Limpia la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    const fetchReservations = () => {
        if (user) {
            const uid = user.uid; // Accede al uid del usuario
            // Lógica para obtener reservas usando uid
        } else {
            console.log("No hay usuario autenticado.");
        }
    };

    useEffect(() => {
        fetchReservations(); // Llama a la función para obtener reservas
    }, [user]); // Llama a fetchReservations cuando el usuario cambie
  


   return (
       <div>
        {user ? (
                <h1>Bienvenido, {user.email}</h1> // Muestra el email del usuario
            ) : (
                <h1>No hay usuario autenticado.</h1> // Mensaje si no hay usuario
            )}
           <h1>Sistema de Reservas de Coworking</h1>
           <h2>Registro</h2>
           <Register />
           <h2>Iniciar Sesión</h2>
           <Login />
           <h2>Espacios Disponibles</h2>
           <Spaces />
           <h2>Reservar Espacio</h2>
           <Reservation />
           <h2>Gestionar Reservas</h2>
           <ManageReservations />
       </div>
   );
};

export default App;
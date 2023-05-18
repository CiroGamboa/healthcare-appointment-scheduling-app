import React from "react";
import Axios from "axios";

const ReservationLink = ({slotId}) => {
  const reserveSlot = async (slotId) => {
    try {
      const patient = JSON.parse(localStorage.getItem("patient"));
      console.log(patient);
      const response = await Axios.post('http://localhost:5000/reserve-slot', { slotId, patient});
  
      if (response.status === 200) {
        console.log(response.data.message); // Mensaje de éxito
        // Realizar acciones necesarias después de una reserva exitosa
        
        alert("Cita reservada exitosamente")

      } else {
        console.error('Fallo al reservar el slot');
        // Manejar el caso de una respuesta de error
      }
    } catch (error) {
      console.error('Error de red:', error);
      // Manejar errores de red u otros errores
    }
  };
  
  const handleReservation = () => {
    reserveSlot(slotId);
  };
  
  return (
    <a href="/patient" onClick={handleReservation}>
      Reservar
    </a>
  );
};

export default ReservationLink;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, Input, Button, InputGroup, InputGroupAddon } from "reactstrap";

interface Appointment {
  slotId: number;
  date: string;
  time: string;
  patientName: string;
  patientAge: number;
  patientId: string;
  patientType: string;
}

const Admin = () => {
  const [text, setText] = useState('Escriba su ID');
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await Axios.get<Appointment[]>('http://localhost:5000/citas');
      const citas = response.data;
      setAppointments(citas);
      console.log(citas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Todas las Citas Agendadas</h2>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Paciente</th>
              <th scope="col">ID</th>
              <th scope="col">Edad</th>
              <th scope="col">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.slotId}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientAge}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.patientType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

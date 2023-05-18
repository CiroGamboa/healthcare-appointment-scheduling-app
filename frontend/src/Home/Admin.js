import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";

import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";


const Admin = () => {
  const [text, setText] = useState('Escriba su ID');
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    Axios.get('http://localhost:5000/citas')
    .then(response => {
      const citas = response.data;
      setAppointments(citas);
      console.log(citas);
    })
    .catch(error => {
      console.error(error);
    });
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
                <tr key={appointment.id}>
                <td>{appointment.fecha}</td>
                <td>{appointment.hora}</td>
                <td>{appointment.nombre}</td>
                <td>{appointment.edad}</td>
                <td>{appointment.id}</td>
                <td>{appointment.tipoPaciente}</td>
                </tr>
            ))}
            </tbody>
      </table>

      </div>
    </div>
  );
};

export default Admin;

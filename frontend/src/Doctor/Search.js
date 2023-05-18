import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
// import { ListGroup, ListGroupItem } from "reactstrap";

import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";


const Search = () => {
  const [text, setText] = useState('Escriba su ID');
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await Axios.get(`http://localhost:5000/patient-appointments/${patientId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelAppointment = async appointmentId => {
    try {
      await Axios.post("http://localhost:5000/cancel-appointment", { appointmentId });
      fetchAppointments();
      console.log("Appointment canceled");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Input
              type="text"
              placeholder="Ingrese su número de identificación"
              onChange={e => {setPatientId(e.target.value)}}
              className="mb-1"
            />
            <div style={{ height: 10 }} className="">
              <InputGroupAddon addonType="append">
                <Button
                  className="h-10 d-inline-block"
                  color="primary"
                  onClick={() => fetchAppointments()}
                >
                  Buscar cita 
                </Button>
              </InputGroupAddon>
            </div>
          </InputGroup>
        </Col>
      </Row>

        <div>
        <h2>Citas Agendadas</h2>
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
              <div key={appointment.slotId}>
                <th scope="row">{appointment.date}</th>
                <th scope="row">{appointment.time}</th>
                <th scope="row">{appointment.patientName}</th>
                <th scope="row">{appointment.patientAge}</th>
                <th scope="row">{appointment.patientId}</th>
                <th scope="row">{appointment.patientType}</th>
                <td>
                  <button onClick={() => cancelAppointment(appointment.id)}>Cancelar</button>
                </td>
                <hr />
              </div>
            ))}
          </tbody>
      </table>

      </div>
    </div>
  );
};

export default Search;

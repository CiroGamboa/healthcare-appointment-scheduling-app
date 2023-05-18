import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const LeftsidePatient = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/patient">
            <Option Value="Datos Personales" />
          </Link>
        </li>
        <li>
          <Link to="/patient/selectdate">
            <Option Value="Agendar Cita" />
          </Link>
        </li>
        <li>
          <Link to="/patient/appointment-status">
            <Option Value="Estado de la Cita" />
          </Link>
        </li>

        <li>
          <Link to="/patient/previousappointments">
            <Option Value="Citas Previas" />
          </Link>
        </li>

       
      </ul>
    </div>
  );
};

export default LeftsidePatient;

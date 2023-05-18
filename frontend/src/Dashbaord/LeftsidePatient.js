import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const LeftsidePatient = () => {
  return (
    <div>
      <ul>
        <li onClick={localStorage.setItem("premium",false)}>
          <Link to="/patient/info">
            <Option Value="Agendar Cita"/>
          </Link>
        </li>
        <li>
          <Link to="/patient/appointment-status">
            <Option Value="Solicitar Ticket" />
          </Link>
        </li>  
        <li>
          <Link to="/admin">
            <Option Value="Admin Panel" />
          </Link>
        </li>         
      </ul>
    </div>
  );
};

export default LeftsidePatient;

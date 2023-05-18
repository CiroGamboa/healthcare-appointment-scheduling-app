import React from "react";

import Image from "../image/doctor.jpg";

const About = () => {
  return (
    <div className="container">
      <div className="card my-5">
        <div className="row g-0">
          <div className="col-md-4 order-md-2">
            <img
              src={Image}
              className="img-fluid rounded-start"
              alt="..."
              width={300}
              height={300}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Sistema de Reservas de Citas Médicas</h5>
              <p className="card-text">
                Uno de los principales problemas en la situación actual de la pandemia es que los hospitales están ocupados atendiendo a pacientes con COVID-19 y a otros pacientes que presentan síntomas similares. Esto dificulta que los pacientes regulares puedan obtener una cita o consulta. Esta situación empeora debido a las restricciones impuestas por los confinamientos y el miedo a contraer el virus contagioso. Para hacer frente a este problema, hemos desarrollado un enfoque y construido este sistema que brinda servicios médicos y permite a los usuarios conectarse y consultar con médicos. El objetivo era crear una interfaz de usuario minimalista para que las personas de cualquier grupo de edad puedan navegar fácilmente por ella. Un hospital puede registrar a sus médicos en el sistema a través de su proceso legal y luego los pacientes pueden buscar médicos de diferentes especialidades para su consulta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

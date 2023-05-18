import React from "react";
import Card from "./Card";

import doctorlogin from "../image/doctorlogin.png";
import patientlogin from "../image/patientlogin.png";

const LoginButton: React.FC = () => {
  return (
    <div className="d-flex flex-md-row flex-column justify-content-around align-items-center my-4">
      <Card Image={doctorlogin} link={"/doctorlogin"} />
      <Card
        login="Patient"
        Image={patientlogin}
        link={"/patient"}
      />
    </div>
  );
};

export default LoginButton;

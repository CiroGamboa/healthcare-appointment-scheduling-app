import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/LeftsidePatient";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import { Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useHistory } from "react-router-dom";


const PersonalDetails = () => {
  const [patient, setPatient] = useState({"type":"Normal"});
  const [loading, setLoading] = useState(true);
  const { googleId } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState('Normal');
  const history = useHistory();


  // useEffect(() => {
  //   setLoading(true);
  //   const getPatientDetails = async () => {
  //     const res = await Axios.get(
  //       `${process.env.REACT_APP_SERVER_URL}/patients/getPatientDetails/${googleId}`
  //     );
  //     if (res.status === 200) {
  //       setPatient(res.data);
  //       window.localStorage.setItem("user", JSON.stringify(res.data));
  //       setLoading(false);
  //     } else {
  //       console.log(res.data.message);
  //       setLoading(false);
  //     }
  //   };
  //   getPatientDetails();
  // }, [googleId]);

  const isPremium = () => {
    if(patient.type === "Premium"){
      history.push("/patient/selectdate")
    } else {
      scheduleCita();
    }
  }

  const scheduleCita = async () => {
    try {
      const response = await Axios.post(`http://localhost:5000/reserve-basic`,{patient});
      alert("Cita agendada. Consulta con tu número de ID los detalles");
      history.push("/patient/")
    } catch (error) {
      console.error(error);
      alert("No se pudo agendar la cita, intente nuevamente");
    }
  };

  return (
    <div className="bg-dark" style={{ height: "110vh" }}>
      <Navbar />
      {/* {loading ? (
        <div className="row justify-content-center position-relative">
          <div
            className="spinner-border align-middle d-flex justify-content-center position-absolute top-50 start-50 translate-middle"
            style={{ width: "10rem", height: "10rem" }}
            role="status"
          ></div>
        </div>
      ) : ( */}
        <div>
          <div className="row m-5" style={{ maxWidth: "100%" }}>
            <div
              className="col-3 col-md-3 p-4 bg-white "
              style={{ height: "85vh" }}
            >
              <Leftside />
            </div>
            <div
              className="col-9 col-md-9 p-4"
              style={{
                border: "15px solid yellow ",
                height: "85vh",
                backgroundColor: "#6c757d",
              }}
            >
              <div className="row ">
                <div className="col-9 col-md-9 p-4">
                  <div className="card mb-4">
                    <h4 className="card-header">Datos Personales</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span className="badge badge-success mr-2 p-2" style={{marginBottom:"10px"}}>
                          Nombre:
                        </span>
                        <div>
                          <Input 
                            
                              type='text'
                              name='name'
                              id='name'
                              placeholder='Escriba su nombre completo'
                              onChange={(e) => {
                                    patient['name'] = e.target.value
                                    setPatient(patient)
                                    localStorage.setItem("patient",JSON.stringify(patient))
                                  }
                                }
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <span className="badge badge-success mr-2 p-2"  style={{marginBottom:"10px"}}>
                          Identificación:
                        </span>
                        <div>
                          <Input 
                            
                              type='text'
                              name='identification'
                              id='identification'
                              placeholder='Escriba su número de identificación'
                              onChange={(e) => { 
                                    patient['id'] = e.target.value
                                    setPatient(patient)
                                    localStorage.setItem("patient",JSON.stringify(patient))
                                  }
                                }
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <span className="badge badge-success mr-2 p-2"  style={{marginBottom:"10px"}}>
                          Edad:
                        </span>
                        <div>
                          <Input 
                              type='text'
                              name='age'
                              id='age'
                              placeholder='Escriba su edad'
                              onChange={(e) => {
                                    patient['age'] = e.target.value
                                    setPatient(patient)
                                    localStorage.setItem("patient",JSON.stringify(patient))
                                  }
                                }
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <span className="badge badge-success mr-2 p-2"  style={{marginBottom:"10px"}}>
                          Tipo de Cliente:
                        </span>
                        <UncontrolledDropdown>
                          <DropdownToggle caret color="dark">
                            {selectedOption}
                          </DropdownToggle>
                          <DropdownMenu dark>
                            <DropdownItem onClick={() => {
                              setSelectedOption('Normal')
                              patient['type'] = 'Normal'
                                    setPatient(patient)
                                    localStorage.setItem("patient",JSON.stringify(patient))
                              }}>
                              Normal
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                setSelectedOption('Premium')
                                patient['type'] = 'Premium'
                                setPatient(patient)
                                localStorage.setItem("patient",JSON.stringify(patient))
                            }}>
                              Premium
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                    
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mr-2 p-2">
              <div className="col-2">
                <Link to="/patient/info">
                  <Button color="danger">Volver</Button>
                </Link>
              </div>
              {/* </Col>
            <Col> */}
              <div className="col-4">
                  <Button color="secondary" onClick={scheduleCita}>Confirmar consulta</Button>
              </div>
              <div className="col-4">
                  <Button color="primary" onClick={isPremium}>Ir a consulta Premium+</Button>
              </div>
              {/* </Col>
          </Row> */}
            </div>
              
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};
export default PersonalDetails;

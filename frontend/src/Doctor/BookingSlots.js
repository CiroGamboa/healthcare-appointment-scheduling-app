import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import LeftsidePatient from "../Dashbaord/LeftsidePatient";
import ReservationLink from "./ReservationLink"
import { Button } from "reactstrap";


import Axios from "axios";


const BookingSlots = (props) => {
  // console.log(props.location.state)
  const { date, doctor } = props.location.state;
  console.log("Date: " + date + " DoctorId: " + doctor); 
  const [slotId, setdateId] = useState();
  const [Slots, setSlots] = useState([]);
  const patient =JSON.parse(localStorage.getItem("patient"));


  useEffect(() => {
    const fetchDate = async (dateToPost) => {
      const { data } = await Axios.post(
        `http://localhost:5000/slots/`,
        {
            
           date: dateToPost
         }
      );
      console.log(data);
      setdateId(data._id);
      setSlots(data);
    };

    function getDateString() {
      let finalDate = date.getFullYear().toString()
      const month = date.getMonth() + 1
      const day = date.getDate();
  
      if(month < 10) {
        finalDate += ('-0' + month.toString())
      }
      else {
        finalDate += '-' + month.toString()
      }
  
      if(day < 10) {
        finalDate += ('-0' + day.toString())
      }
      else {
        finalDate += '-' + day.toString()
      }
  
      return finalDate
  
    }
    const dateToSend = getDateString()
    fetchDate(dateToSend);
  }, []);

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div className="col-3 col-md-3 p-4 bg-white ">
            <LeftsidePatient />
          </div>
          <div
            className="col-9 col-md-9 p-4"
            style={{
              border: "15px solid yellow ",
              height: "80vh",
              backgroundColor: "#6c757d",
            }}
          >
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Slot</th>
                  <th scope="col">Estado de la reserva</th>
                </tr>
              </thead>
              <tbody>
              {Slots.map((slot) => (
                <tr key={slot.id}>
                  <th scope="row">{slot.time}</th>
                  {slot.isBooked ? (
                    <td>Reservado</td>
                  ) : (
                    <td>
                      <ReservationLink slotId={slot.id}/>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <div className="justify-content-center">
              <div className="col-2">
                <Link to="/patient/selectdate">
                  <Button color="danger">Volver</Button>
                </Link>
              </div>
            </div>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSlots;

/* global gapi */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsidePatient";
import Search from "../Doctor/Search";
import Admin from "./Admin";

const AdminPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [filteredAppointments, setFilteredAppointments] = useState()

    function getMeetLink(id) {
        if(filteredAppointments !== undefined){
            const meetCode = filteredAppointments.find((apntmnt) => {
                return apntmnt.id === id
            })

            return meetCode ? meetCode.hangoutLink : "#"
        }
        return '#'
    }

    useEffect(() => {
        setIsLoading(true)

        const fetchAppointments = async () => {
            var { data } = await Axios.post(
                `${process.env.REACT_APP_SERVER_URL}/patients/upcoming-appointments/`,
                {
                    googleId: localStorage.getItem("googleId"),
                }
            );
            
            // const response = await window.gapi.client.calendar.events.list({
            //     'calendarId': 'primary',
            //     'timeMin': (new Date()).toISOString(),
            //     'showDeleted': false,
            //     'singleEvents': true,
            //     'maxResults': 100,
            //     'orderBy': 'startTime'
            // })

            // // Filter google calendar events
            // const events = response.result.items
            // const filteredEvents = events.filter((event) => {
            //     return data.find((it) => it._id === event.id)
            // })

            console.log(data)
            setAppointments(data);
            // console.log(filteredEvents)
            // setFilteredAppointments(filteredEvents)
        };

        fetchAppointments()
        setIsLoading(false)
    }, []);



    return (
        <div className="bg-dark" style={{ height: "100vh" }}>
            <Navbar />
            <div>
                <div className="row m-5" style={{ maxWidth: "100%" }}>
                
                    <div
                        className="col-3 col-md-3 p-4 bg-white "
                        style={{ height: "80vh" }}
                    >
                        <Leftside />
                    </div>
                    {isLoading && <h1>Loading</h1>}
                    {!isLoading && <div
                        className="col-9 col-md-9 p-4"
                        style={{
                            border: "15px solid yellow ",
                            height: "80vh",
                            backgroundColor: "#6c757d",
                        }}
                    >
                        <Admin />
                    
                    </div> }
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
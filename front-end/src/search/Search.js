import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../dashboard/ListReservations";
import { search } from "../utils/api";

export default function Search() {
    const [mobileNumber, setMobileNumber] = useState("")
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    const handleChange = (evt) => {
        evt.preventDefault();
        setMobileNumber(evt.target.value)
    }

    function searchReservations() {
        const abortController = new AbortController();
        setReservationsError(null);
        setReservations([]);
        search(mobileNumber)
            .then((res) =>{
                if (res.length === 0){
                    setReservations([]);
                } else{
                    setReservations(res);
                }
            })
            .catch(setReservationsError)
        return () => abortController.abort();
    };

    const handleFind = (evt) => {
        evt.preventDefault();
        search(mobileNumber)
            .then((res) =>{
                if (res.length === 0){
                    setReservations([]);
                } else{
                    setReservations(res);
                }
            })
            .catch(setReservationsError)
    };

    return (
        <div className="d-flex mb-3 flex-column">
          <h1 className="align-self-center">Search for Reservations</h1>
          <div className="col-12">
            <ErrorAlert error={reservationsError} />
          </div>
          <form onSubmit={handleFind} className="align-self-center">
            <div className="col align-self-center">Enter a phone number</div>
            <div style={{display: 'flex',  justifyContent:'center',  height: '7vh'}}>
                <input name="mobile_number" id="mobile_number" placeholder="###-###-####" onChange={handleChange} required />
            </div>
            <div style={{display: 'flex',  justifyContent:'center',  height: '7vh'}}>
                <button type="submit" className="btn btn-primary px-3 mt-2">
                    Find
                </button>
            </div>
          </form>
          <div className="align-self-center col-12 col-xl-10 mt-4">
            <ListReservations reservations={reservations} loadDashboard={searchReservations}/>
          </div>
        </div>
    )
}
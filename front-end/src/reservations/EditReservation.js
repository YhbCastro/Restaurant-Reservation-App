import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationsForm";
import { updateReservation, readReservation } from "../utils/api";

export default function EditReservation() {
    const { reservationId } = useParams();

    const [defaultForm, setDefaultForm] = useState({
        first_name: '',
        last_name: '',
        reservation_date: '',
        reservation_time: '',
        mobile_number: '',
        people: 0
    });

    useEffect(() => {
        readReservation(reservationId)
            .then((res) => {
                res.reservation_date = formatAsDate(res.reservation_date);
                return res
            })
            .then(setDefaultForm)
    }, [reservationId]);

    const update = (reservationData) => {
        return updateReservation(reservationId, reservationData)
    }

    return (
        <ReservationForm defaultForm={defaultForm} submitType={update} newOrEdit={'Edit'}/>
    )
}
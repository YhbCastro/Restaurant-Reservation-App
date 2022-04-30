import React from 'react';
import { createReservation } from '../utils/api';
import ReservationForm from './ReservationsForm';

export default function CreateReservation() {
    const emptyForm = {
        first_name: '',
        last_name: '',
        reservation_date: '',
        reservation_time: '',
        mobile_number: '',
        people: 0
    };

    const creation = (reservationData) => {
        return createReservation(reservationData);
    };

    return (
        <ReservationForm defaultForm={emptyForm} submitType={creation} newOrEdit={'New'}/>
    )
}
import React, { useState, useEffect } from 'react';
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from 'react-router-dom';

export default function ReservationForm({defaultForm, submitType, newOrEdit}) {
    const history = useHistory();
    
    const [formData, setFormData] = useState(defaultForm);
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        setFormData(defaultForm);
    }, [defaultForm])

    const validForm = () => {
        let result = true;
        let reservationDate = new Date(`${formData.reservation_date}T${formData.reservation_time}`);
        if (Date.parse(reservationDate) < Date.parse(new Date())) {
            result = false;
            setFormErrors((currentErrors) => [
                ...currentErrors,
                { message: 'You have selected a past date, please select a future date for your reservation.'}
            ]);
        };
        if (reservationDate.getDay() === 2) {
            result = false;
            setFormErrors((currentErrors) => [
                ...currentErrors,
                { message: 'You have selected a reservation on a Tuesday. The restaurant is not open on Tuesdays, please select another day for your reservation.'}
            ]);
        };

        const open = new Date(`${formData.reservation_date}T10:30`);
        const close = new Date(`${formData.reservation_date}T21:30`);
        if (reservationDate < open) {
            result = false;
            setFormErrors((currentErrors) => [
                ...currentErrors,
                { message: 'You have selected a reservation time for before we open. Please select a time between 10:30am and 9:30pm.'}
            ]);
        };
        if (reservationDate > close) {
            result = false;
            setFormErrors((currentErrors) => [
                ...currentErrors,
                { message: 'You have selected a reservation time for after we open. Please select a time between 10:30am and 9:30pm.'}
            ]);
        };
        return result
    };

    const showErrors = formErrors.map((error, index) => <ErrorAlert error={error} key={index}/>);

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setFormErrors([]);

        formData.people = Number(formData.people);

        if (validForm()) {
            submitType(formData)
                .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
                .catch((error) => setFormErrors((currentErrors) => [...currentErrors, error]));
        };
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <div>
            <div className="d-flex flex-column mb-3">
                {newOrEdit === 'New' ? <h1>Create a New Reservation</h1>:<h1>Edit Reservation</h1>}
            </div>
            <div className="flex-column mb-3">
            
                <form className=" col-12 align-self-center" onSubmit={handleSubmit}>
                    {showErrors}
                    <fieldset className="align-center">
                        <div className="mb-3">
                            <label htmlFor="first_name">First Name</label>
                            <input id="first_name" type="text" name="first_name" placeholder="Jane/John" className="form-control" value={formData.first_name} onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="last_name">Last Name</label>
                            <input id="last_name" type="text" name="last_name" placeholder="Doe" className="form-control" value={formData.last_name} onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile_number">Phone number</label>
                            <input id="mobile_number" type="text" name="mobile_number" placeholder="xxx-xxx-xxxx" className="form-control" value={formData.mobile_number} onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="reservation_date">Reservation Date</label>
                            <input id="reservation_date" type="date" name="reservation_date" className="form-control" value={formData.reservation_date} onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="reservation_time">Reservation Time</label>
                            <input id="reservation_time" type="time" name="reservation_time" className="form-control" value={formData.reservation_time} onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="people">Number of People in Party</label>
                            <input id="people" type="number" name="people" placeholder="2" className="form-control " min="1" value={formData.people} onChange={handleChange} required />
                        </div>

                        <div className="justify-content-around d-flex">
                            <button type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-lg ">
                                Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        
    )
};
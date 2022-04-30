import React from "react";
import { useHistory } from "react-router-dom";
import {today, next, previous } from "../utils/date-time";

export default function ChangeDate({displayedDate, buttonType}) {
    const history = useHistory();
    let newDate
    switch(buttonType) {
        case 'Previous':
            newDate = previous(displayedDate);
            break;
        case 'Today':
            newDate = today()
            break;
        case 'Next':
            newDate = next(displayedDate);
            break;
        default: 
            break;
    };

    const handleClick = () => {
        history.push(`/dashboard?date=${newDate}`);
      };

    return (
        <button className={`btn ${buttonType === 'Today' ? 'btn-primary':'btn-secondary'} me-3 mb-3`} onClick={handleClick}>
            {buttonType}
        </button>
    )

}
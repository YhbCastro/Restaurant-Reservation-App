import React from "react";
import { Link } from "react-router-dom";
import { updateStatus } from "./api";

export function CancelBtn({ reservation_id, status, loadDashboard }) {
  

  const handleCancel = (evt) => {
      evt.preventDefault();

      if (window.confirm( "Do you want to cancel this reservation? This cannot be undone.")) {
        updateStatus(reservation_id, "cancelled")
          .then(() => {
            loadDashboard();
            if (status === 'seated') {
              
            }
          })
          .catch((err) => console.log("Cancel Button Error ", err));
      }
    };
    

    return (
        <button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation_id} onClick={handleCancel}>
          Cancel
        </button>
      );
}

export function SeatBtn({ reservation_id }) {
    return (
      <Link to={`/reservations/${reservation_id}/seat`} href={`/reservations/${reservation_id}/seat`}>
        <button type="button" className="btn btn-primary">
          Seat
        </button>
      </Link>
    );
  }

export function EditBtn({ reservation_id }) {
    return (
      <Link to={`/reservations/${reservation_id}/edit`} href={`/reservations/${reservation_id}/edit`}>
        <button type="button" className="btn btn-secondary">
          Edit
        </button>
      </Link>
    );
  }
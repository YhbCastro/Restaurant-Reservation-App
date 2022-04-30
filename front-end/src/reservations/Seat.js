import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, listTables, seatTable } from "../utils/api";
import { formatAsDate } from "../utils/date-time"

export default function Seat() {
  const history = useHistory();
  const { reservationId } = useParams();
  
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [table, setTable] = useState(3);
  const [tableError, setTableError] = useState(null);
  const [reservation, setReservation] = useState({});

  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return
  }

  useEffect(loadTables, [])

  useEffect(loadReservation, [reservationId]);

  const handleSeat = (evt) => {
    evt.preventDefault();
    if (tables) {
      const abortController = new AbortController();
      seatTable(table, reservationId, abortController.signal)
        .then(loadTables)
        .then(() => {
          history.push(`/dashboard?date=${formatAsDate(reservation.reservation_date)}`);
        })
        .catch((err) => {
          if (err) setTableError(err);
        });
    };
    if (table.full) {
      setTableError({ message: "This table is occupied" });
    };
  };

  const handleChooseTable = (evt) => {
    evt.preventDefault();
    setTable(evt.target.value);
  }
  
  const TablesOptions = () => {
    return tables.map((t, index) => {
      return (
        <option key={t.table_id} value={t.table_id}>
          {t.table_name} - {t.capacity}
        </option>
      );
    });
  };

  return (
    <div className="d-flex flex-column mb-3">
      <h1 className="align-self-center">Seat a reservation</h1>
      <div className="container-lg d-flex flex-column align-items-center justify-content-center px-0">
        <div className="col-12">
          <ErrorAlert error={tablesError} />
          <ErrorAlert error={tableError} />
        </div>
        <div className="col-12" >
        <form onSubmit={handleSeat}>
          <div className="row col mb-3 align-items-center justify-content-center">
                <label htmlFor="table_select">Table Selection</label>
                <select name="table_id" id="table_id" className="form-select form-select-lg mb-3" aria-label=".form-select-lg table-select" placeholder="choose table" value={table} onChange={handleChooseTable}>
                  <TablesOptions/>
                </select>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button"  className="btn btn-secondary" onClick={() => history.goBack()} >
                  Cancel
                </button>
          </div>
          <div className="row col mb-3 align-items-center justify-content-center">
            Reservation has {reservation.people} people in their party
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
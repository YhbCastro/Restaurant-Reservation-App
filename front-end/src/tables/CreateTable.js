import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function CreateTable() {
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        table_name: "",
        capacity: 0
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setFormErrors([]);

        formData.capacity = Number(formData.capacity)

        createTable(formData)
            .then(() => history.push('/dashboard'))
            .catch((error) => setFormErrors((currentErrors) => [...currentErrors, error]))
    };
    
    const showErrors = formErrors.map((error, index) => <ErrorAlert error={error} key={index}/>);

    const handleCancel = () => {
        history.goBack();
    };

    return (
      <div>
        <div className="d-flex flex-column mb-3">
          <h1>Create a New Table</h1>
        </div>
        <div className="flex-column mb-3">
          <form onSubmit={handleSubmit} className="col-12 align-self-center" >
            {showErrors}
            <fieldset>
              <div className="form-group">
                <label htmlFor="table_name">Table Name</label>
                <input id="table_name" type="text" name="table_name" placeholder="Table #1" className="form-control" value={formData.table_name} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Table Capacity</label>
                <input id="capacity" type="number" name="capacity" className="form-control " min="1" value={formData.capacity} onChange={handleChange} required/>
              </div>

              <div className="justify-content-around d-flex">
                <button type="button" className="btn btn-secondary btn-lg" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
}
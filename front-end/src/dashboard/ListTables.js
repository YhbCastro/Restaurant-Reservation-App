import React from "react";
import { finishTable } from "../utils/api";
import { Link } from "react-router-dom";


export default function ListTables({tables, loadDashboard}) {

    const required = {
        table_name: "Table Name",
        capacity: "Capacity",
        reservation_id: "Availability",
    }

    const handleFinish = (table) => {
        if (window.confirm( "Is this table ready to seat new guests? This action cannot be undone." )) {
            finishTable(table.table_id)
                .then(loadDashboard)
        };
    };

    const FinishBtn = ({table}) => {
        
        let className = table.reservation_id ? "btn btn-danger":"btn btn-secondary" 
        return (
            <button data-table-id-finish={table.table_id} type="button" className={className} disabled={!table.reservation_id} value={table.table_id} onClick={() => handleFinish(table)}>
              Finish
            </button>
          );
    }

    const Rows = () => {
        return tables.map((table, i) => { 
            const Row = () => {
                return Object.keys(required).map((key, index) => {
                    if (key === 'reservation_id'){
                        return table.reservation_id ? (<td key={index} data-table-id-status={table.table_id}>occupied</td>):(<td key={index} data-table-id-status={table.table_id}>free</td>)
                    }
                    return (<td key={index}>{table[key]}</td>);
                });
            };
            return (
                <tr key={i}>
                    <Row />
                    <td>
                        <FinishBtn table={table} />
                    </td>
                </tr>
            )
        })
    };

    const Table = () => {
        return (
        <table className="table">
            <thead>
                <tr> 
                    {Object.values(required).map((info, index)=> <th key={index}>{info}</th>)}
                </tr>
            </thead>
            <tbody>
                <Rows />
            </tbody>
        </table>
        )
    }
    
    const NoTables = () => {
        return (
            <div>
                <div style={{display: 'flex',  justifyContent:'center',  height: '7vh'}}>
                    <h2>No tables</h2>
                </div>
                <div style={{display: 'flex',  justifyContent:'center',  height: '10vh'}}>
                    <Link to={`/tables/new`} href={`/tables/new`} >
                        <button type="button" className="btn btn-success">
                            Add a Table
                        </button>
                    </Link>
                </div>
            </div>               
        )
    }

    return (
        <div className="row">
            <div className="col-12">
                {tables.length === 0 ? <NoTables/> : <Table /> }
            </div>
        </div>
    )
}
import React from "react";

export default props => {
    return (
        <tr>
            <td className="td-break">{props.device._id}</td>
            <td><button className="btn btn-warning" onClick={() => props.handleDeleteDeviceRequest(props.local_id, props.device._id)} title="Eliminar"><i className="fa fa-ban"></i></button></td>
        </tr>
    );
};
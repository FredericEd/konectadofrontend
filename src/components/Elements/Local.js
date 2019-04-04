import React from "react";
import { Link } from "react-router-dom";
import Device from '../Elements/Device';

export default props => {
    return (
        <div className="col-md-6 col-sm-12">
            <div className="contact-box">
                    <div className="col-sm-6">
                        <h3><strong>{props.local.name}</strong></h3>
                        <address>
                            {props.local.address}<br />
                            <i className="fa fa-map-marker"></i> {props.local.city.name}<br />
                            {props.local.email}<br />
                            <abbr title="Teléfono">Tel.:</abbr> {props.local.phone}
                        </address>
                        <div>
                            <button className="btn btn-success sspaced" onClick={() => props.handleCreateDeviceRequest(props.local._id)} title="Nuevo dispositivo"><i className="fa fa-desktop"></i></button>
                            <Link to={{pathname: "/stores/locales/create", state: {local: props.local}}}>
                                <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                            </Link>
                            <button className="btn btn-success sspaced" onClick={() => props.handleDeleteRequest(props.local._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h4>Dispositivos</h4>
                        <table className="table table-hover" style={{marginBottom: 0}}>
                            <tbody>
                                {props.local.devices.length === 0 && (<tr><td><span><em>No hay dispotivos disponibles.</em></span></td></tr>)}
                                {props.local.devices.map(device => <Device key={device._id} device={device} local_id={props.local._id} handleDeleteDeviceRequest={props.handleDeleteDeviceRequest} />)}
                            </tbody>
                        </table>
                    </div>
                    <div className="clearfix"></div>
            </div>
        </div>
    );
};
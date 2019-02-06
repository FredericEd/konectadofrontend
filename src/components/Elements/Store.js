import React from "react";
import { Link } from "react-router-dom";

export default props => {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="contact-box">
                    <div className="col-sm-4 vcenter">
                        <div className="text-center">
                            <img className="img-circle m-t-xs img-responsive" src={`data:image/png;base64,${props.store.image_file}`} alt={`Imagen de ${props.store.name}`} />
                        </div>
                    </div>
                    <div className="col-sm-8 vcenter">
                        <h3><strong>{props.store.name}</strong></h3>
                        <p>{props.store.description}</p>
                        <div>
                            <Link to={{pathname: "/stores/locales", state: {store: props.store}}}>
                                <button className="btn btn-success sspaced" title="Locales"><i className="fa fa-building"></i></button>
                            </Link>
                            <Link to={{pathname: "/stores/productos", state: {store: props.store}}}>
                                <button className="btn btn-success sspaced" title="Productos"><i className="fa fa-list"></i></button>
                            </Link>
                            <Link to={{pathname: "/stores/cupones", state: {store: props.store}}}>
                                <button className="btn btn-success sspaced" title="Cupones"><i className="fa fa-credit-card"></i></button>
                            </Link>
                            <Link to={{pathname: "/stores/create", state: {store: props.store}}}>
                                <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                            </Link>
                                <button className="btn btn-success sspaced" onClick={() => props.handleDeleteRequest(props.store._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
            </div>
        </div>
    );
};
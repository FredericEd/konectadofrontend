import React from 'react';
import { Link } from "react-router-dom";

const $ = require('jquery');

export default props => {
    return (
        <tr>
                <td>{props.card.start}</td>
                <td>{props.card.end}</td>
                <td>{props.card.product.name}</td>
                <td>{props.card.counter_max}</td>
                <td>{props.card.counter}/{props.card.counter_gift}</td>
                <td>
                    {props.card.activated && 
                    <div>
                    <Link to={{pathname: "/stores/cards/create", state: {card: props.card}}}>
                        <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                    </Link>
                    <button className="btn btn-success sspaced" onClick={() => props.handleDeleteRequest(props.card._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                    </div>
                    }
                </td>
        </tr>
    );
}
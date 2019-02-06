import React from 'react';
import { Link } from "react-router-dom";

export default props => {
    return (
        <tr>
                <td>{props.coupon.start}</td>
                <td>{props.coupon.end}</td>
                <td>{props.coupon.product.name}</td>
                <td>{props.coupon.counter_max}</td>
                <td className="text-navy">{props.coupon.discount}%</td>
                <td>
                    <Link to={{pathname: "/stores/cupones/create", state: {coupon: props.coupon}}}>
                        <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                    </Link>
                    <button className="btn btn-success sspaced" onClick={() => props.handleDeleteRequest(props.coupon._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                </td>
        </tr>
    );
}
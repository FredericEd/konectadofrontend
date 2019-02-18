import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Billboard extends Component {
    
    render () {
        return (
            <tr>
                <td>{this.props.billboard.city.name}</td>
                <td>{this.props.billboard.address}</td>
                <td>
                    <Link to={{pathname: "/billboards/create", state: {billboard: this.props.billboard}}}>
                        <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                    </Link>
                    <button className="btn btn-success sspaced" onClick={() => this.props.handleDeleteRequest(this.props.billboard._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                </td>
            </tr>
        );
    }
};
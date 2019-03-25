import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Member extends Component {
    
    render () {
        return (
            <tr>
                <td>{this.props.member.name}</td>
                <td>{this.props.member.email}</td>
                <td>{this.props.member.phone}</td>
                <td>
                    <Link to={{pathname: "/members/create", state: {member: this.props.member}}}>
                        <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                    </Link>
                    <button className="btn btn-success sspaced" onClick={() => this.props.handleDeleteRequest(this.props.memmber._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                </td>
            </tr>
        );
    }
};
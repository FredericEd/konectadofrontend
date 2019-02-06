import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class Product extends Component {
    
    state = {
        showImage: false,
    }
    render () {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td className="text-navy">${this.props.product.price}</td>
                <td>{this.props.product.description}</td>
                <td>
                    <button className="btn btn-success sspaced" onClick={() => this.setState({ showImage: true })}><i className="fa fa-image"></i></button>
                    <Link to={{pathname: "/stores/productos/create", state: {product: this.props.product}}}>
                        <button className="btn btn-success sspaced" title="Editar"><i className="fa fa-pencil"></i></button>
                    </Link>
                    <button className="btn btn-success sspaced" onClick={() => this.props.handleDeleteRequest(this.props.product._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                    {this.state.showImage && (
                    <Lightbox
                        mainSrc={`data:image/png;base64,${this.props.product.image_file}`}
                        onCloseRequest={() => this.setState({ showImage: false })}
                    />
                    )}
                </td>
            </tr>
        );
    }
}
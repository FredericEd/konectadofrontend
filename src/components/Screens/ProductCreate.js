import React, { Component } from 'react';
import {saveProduct} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

class ProductCreate extends Component {
    state = {
        product_id: false,
        store_id: 0,
        name: "",
        price: "",
        description: "",

        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: false,
    }
    image_file = React.createRef();
    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const product = this.props.location.state.product;
        if (typeof product != 'undefined') {
            this.setState({
                product_id: product._id,
                store_id: product.store_id,
                name: product.name,
                description: product.description,
                price: product.price,
            });
        } else this.setState({store_id: this.props.location.state.store_id});
    }
    
    prepareForm = () => {
        this.props.changeBreadcumb(this.state.product_id ? "Editar producto" : "Crear producto");
        $("input").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.name != "" && $("#name").parent().addClass("is-filled");
        this.state.description != "" && $("#description").parent().addClass("is-filled");
        this.state.price != "" && $("#price").parent().addClass("is-filled");
    }
    componentDidMount() {
        this.prepareForm();
    }

    handleName = event => {
        this.setState({name: event.target.value});
    }
    handleDescription = event => {
        this.setState({description: event.target.value});
    }
    handlePrice = event => {
        this.setState({price: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        if (typeof this.image_file.current.files[0] == "undefined" && this.state.product_id == false)
            this.setState({alertShow2: true});
        else {
            this.setState({loading: true});
            saveProduct(this.state.product_id, this.state.store_id, this.state.name, this.state.description, this.state.price, this.image_file.current.files[0], this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({alertShow: true, success, response, loading: false});
    }

    render() {
        return (
            <div>
                <SweetAlert
                    show= {this.state.alertShow}
                    title= "Konectado"
                    text= {this.state.response.msg}
                    type= {this.state.success ? "success" : "error"}
                    onConfirm= {() => {
                        this.setState({ alertShow: false });
                        this.state.success && this.props.history.goBack();
                    }}
                />
                <Alert fade={false} color="danger" isOpen={this.state.alertShow2} toggle={() => this.setState({  alertShow2: false })}>
                    ¡Debe elegir una imagen para poder guardar el producto!
                </Alert>
                <div className='sweet-loading text-center'>
                    <BeatLoader
                        sizeUnit={"px"} size={20} color={'#007EC7'}
                        loading={this.state.loading} />
                </div>
                {!this.state.loading && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="name" className="bmd-label-floating">Nombre</label>
                            <input required type="text" className="form-control" onChange={this.handleName} id="name" value={this.state.name} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="description" className="bmd-label-floating">Descripción</label>
                            <input required type="text" className="form-control" onChange={this.handleDescription} id="description" value={this.state.description}  />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="price" className="bmd-label-floating">Precio</label>
                            <input required type="text" className="form-control" onChange={this.handlePrice} id="price" value={this.state.price}  />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label className="margined-right">Imagen:</label>
                            <input type="file" className="sspaced" ref={this.image_file}  />
                        </div>
                        <div className="spaced">
                            <button type="submit" className="btn btn-w-m btn-success">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default ProductCreate;
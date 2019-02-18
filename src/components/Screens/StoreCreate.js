import React, { Component } from 'react';
import {saveStore} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

class StoreCreate extends Component {
    state = {
        store_id: false,
        nombre: "",
        descripcion: "",
        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: false,
    }
    image_file = React.createRef();
    componentWillMount() {
        const store = this.props.location.state.store;
        if (typeof store != 'undefined') {
            this.setState({
                store_id: store._id,
                nombre: store.name,
                descripcion: store.description,
            });
        }
    }
    componentDidMount() {
        this.props.changeBreadcumb(this.state.store_id ? "Editar Afiliado" : "Crear Afiliado");
        $("input[type=text]").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.nombre != "" && $("#nombre").parent().addClass("is-filled");
        this.state.descripcion != "" && $("#descripcion").parent().addClass("is-filled");
    }

    handleNombre = event => {
        this.setState({nombre: event.target.value});
    }
    handleDescripcion = event => {
        this.setState({descripcion: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        if (typeof this.image_file.current.files[0] == "undefined" && this.state.store_id == false)
            this.setState({alertShow2: true});
        else {
            this.setState({loading: true});
            saveStore(this.state.store_id, this.state.nombre, this.state.descripcion, this.image_file.current.files[0], this.handleResponse);
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
                    ¡Debe elegir una imagen para poder guardar al afiliado!
                </Alert>
                <div className='sweet-loading text-center'>
                    <BeatLoader
                        sizeUnit={"px"} size={20} color={'#007EC7'}
                        loading={this.state.loading} />
                </div>
                {!this.state.loading && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Nombre</label>
                            <input required type="text" className="form-control" onChange={this.handleNombre} id="nombre" value={this.state.nombre} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="formGroupExampleInput2" className="bmd-label-floating">Descripción</label>
                            <input required type="text" className="form-control" onChange={this.handleDescripcion} id="descripcion" value={this.state.descripcion}  />
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

export default StoreCreate;
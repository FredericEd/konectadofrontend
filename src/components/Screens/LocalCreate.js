import React, { Component } from 'react';
import ReactMap from '../Elements/ReactMap';
import {saveLocal, getCiudades} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

class LocalCreate extends Component {

    state = {
        local_id: false,
        name: "",
        address: "",
        email: "",
        phone: "",
        store_id: 0,
        city_id: 0,
        latitude: 0,
        longitude: 0,
        ciudades: [],
        
        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: true,
    }

    handleName = event => {
        this.setState({name: event.target.value});
    }
    handleEmail = event => {
        this.setState({email: event.target.value});
    }
    handleAddress = event => {
        this.setState({address: event.target.value});
    }
    handlePhone = event => {
        this.setState({phone: event.target.value});
    }
    handleCiudad = event => {
        this.setState({city_id: event.target.value});
    }
    handleMarker = (latitude, longitude) => {
        this.setState({latitude, longitude});
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.city_id == "0")
            this.setState({alertShow2: true});
        else {
            this.setState({loading: true});
            saveLocal(this.state.local_id, this.state.name, this.state.address, this.state.email, this.state.phone, this.state.city_id, this.state.latitude, this.state.longitude, this.state.store_id, this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({alertShow: true, success, response, loading: false});
        this.prepareForm();
    }
    handleCiudadesResponse = ciudades => {
        this.setState({ciudades, loading: false});
        this.state.local_id && this.setState({city_id: this.props.location.state.local.city._id});
        this.prepareForm();
    }

    prepareForm = () => {
        this.props.changeBreadcumb(this.state.local_id ? "Editar local" : "Crear local");
        $("input").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.name != "" && $("#name").parent().addClass("is-filled");
        this.state.email != "" && $("#email").parent().addClass("is-filled");
        this.state.address != "" && $("#address").parent().addClass("is-filled");
        this.state.phone != "" && $("#phone").parent().addClass("is-filled");
    }
    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const local = this.props.location.state.local;
        if (typeof local != 'undefined') {
            this.setState({
                local_id: local._id,
                store_id: local.store_id,
                name: local.name,
                email: local.email,
                phone: local.phone,
                address: local.address,
                latitude: local.latitude,
                longitude: local.longitude,
            });
        } else this.setState({store_id: this.props.location.state.store_id});
        getCiudades(this.handleCiudadesResponse);
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
                            <label htmlFor="email" className="bmd-label-floating">Correo</label>
                            <input required id="email" type="email" className="form-control" onChange={this.handleEmail} value={this.state.email} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="address" className="bmd-label-floating">Dirección</label>
                            <input required type="text" className="form-control" onChange={this.handleAddress} id="address" value={this.state.address} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="phone" className="bmd-label-floating">Teléfono</label>
                            <input required type="tel" className="form-control" onChange={this.handlePhone} id="phone" value={this.state.phone} />
                        </div>
                        <select className="form-control" value={this.state.city_id} onChange={this.handleCiudad} >
                            <option value="0">Elija la ciudad</option>
                            {this.state.ciudades.map(ciudad => <option key={ciudad._id} value={ciudad._id}>{ciudad.name}</option>)}
                        </select>
                        <div className="sspaced" />
                        <ReactMap latitude={this.state.latitude} longitude={this.state.longitude} handleMarker={this.handleMarker} />
                        <div className="sspaced" />
                        <Alert fade={false} color="danger" isOpen={this.state.alertShow2} toggle={() => this.setState({  alertShow2: false })}>
                            ¡Debe elegir una ciudad para guardar el local!
                        </Alert>
                        <div className="wrapper-content">
                            <button type="submit" className="btn btn-w-m btn-success">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
export default LocalCreate;
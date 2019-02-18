import React, { Component } from 'react';
import ReactMap from '../Elements/ReactMap';
import {saveBillboard, getCiudades} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

class BillboardCreate extends Component {

    state = {
        billboard_id: false,
        city_id: 0,
        address: "",
        latitude: 0,
        longitude: 0,
        ciudades: [],
        
        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: true,
    }

    handleDireccion = event => this.setState({address: event.target.value});
    handleCiudad = event => this.setState({city_id: event.target.value});
    handleMarker = (latitude, longitude) => this.setState({latitude, longitude});

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.city_id == "0")
            this.setState({alertShow2: true});
        else {
            this.setState({loading: true});
            saveBillboard(this.state.billboard_id, this.state.city_id, this.state.address, this.state.latitude, this.state.longitude, this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({loading: false, alertShow: true, success, response});
    }
    handleCiudadesResponse = ciudades => {
        this.setState({ciudades, loading: false});
        this.state.billboard_id && this.setState({city_id: this.props.location.state.billboard.city._id});
        this.prepareForm();
    }

    prepareForm = () => {
        this.props.changeBreadcumb(this.state.local_id ? "Editar billboard" : "Crear billboard");
        $("input").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.address != "" && $("#address").parent().addClass("is-filled");
    }
    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const billboard = this.props.location.state.billboard;
        if (typeof billboard != 'undefined') {
            this.setState({
                billboard_id: billboard._id,
                address: billboard.address,
                latitude: billboard.latitude,
                longitude: billboard.longitude,
            });
        };
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
                            <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Dirección</label>
                            <input id="address" required type="text" className="form-control" onChange={this.handleDireccion} value={this.state.address} />
                        </div>
                        <select className="form-control" value={this.state.city_id} onChange={this.handleCiudad} >
                            <option value="0">Elija la ciudad</option>
                            {this.state.ciudades.map(ciudad => <option key={ciudad._id} value={ciudad._id}>{ciudad.name}</option>)}
                        </select>
                        <div className="sspaced" />
                        <ReactMap latitude={this.state.latitude} longitude={this.state.longitude} handleMarker={this.handleMarker} />
                        <div className="sspaced" />
                        <Alert fade={false} color="danger" isOpen={this.state.alertShow2} toggle={() => this.setState({  alertShow2: false })}>
                            ¡Debe elegir una ciudad para guardar el billboard!
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

export default BillboardCreate;
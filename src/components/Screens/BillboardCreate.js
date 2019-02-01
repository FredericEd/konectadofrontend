import React, { Component } from 'react';

const $ = require('jquery');

class BillboardCreate extends Component {

    state = {
        direccion: "",
        id_ciudad: 0,
        ciudades: [{city_id: 1, nombre: "Guayaquil"}, {city_id: 2, nombre: "Quito"}, {city_id: 3, nombre: "Cuenca"}],
    }

    handleDireccion = event => {
        this.setState({direccion: event.target.value});
    }
    handleCiudad = event => {
        this.setState({id_ciudad: event.target.value});
    }
    componentDidMount() {
        this.props.changeBreadcumb("Create Billboard");
        $("input[type=text]").focus(function(){
            console.log("test");
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group bmd-form-group">
                        <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Dirección</label>
                        <input type="text" className="form-control" onChange={this.handleDireccion} id="formGroupExampleInput" value={this.state.direccion} />
                    </div>
                    <div className="form-group bmd-form-group">
                        <label htmlFor="formGroupExampleInput2" className="bmd-label-floating">Descripción</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" />
                    </div>
                    <select class="form-control" value={this.state.id_ciudad} onChange={this.handleCiudad} >
                        <option value="0">Elija la ciudad</option>
                        {this.state.ciudades.map((ciudad) => <option value={ciudad.city_id}>{ciudad.nombre}</option>)}
                    </select>
                    <div className="wrapper-content">
                        <button type="button" className="btn btn-w-m btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default BillboardCreate;
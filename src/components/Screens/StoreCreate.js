import React, { Component } from 'react';

const $ = require('jquery');

class BillboardCreate extends Component {

    state = {
        nombre: "",
        descripcion: "",
    }

    handleNombre = event => {
        this.setState({nombre: event.target.value});
    }
    handleDescripcion = event => {
        this.setState({descripcion: event.target.value});
    }
    componentDidMount() {
        this.props.changeBreadcumb("Crear Afiliado");
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
                        <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Nombre</label>
                        <input type="text" className="form-control" onChange={this.handleNombre} id="formGroupExampleInput" value={this.state.nombre} />
                    </div>
                    <div className="form-group bmd-form-group">
                        <label htmlFor="formGroupExampleInput2" className="bmd-label-floating">Descripción</label>
                        <input type="text" className="form-control" onChange={this.handleDescripcion} id="formGroupExampleInput2" value={this.state.descripcion}  />
                    </div>
                    <div className="spaced">
                        <button type="button" className="btn btn-w-m btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default BillboardCreate;
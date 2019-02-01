import React, { Component } from 'react';
import {login} from '../../actions/authActions';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class Login extends Component {

    state = {
        correo: "",
        clave: "",
        alertShow: false,
        alertMessage: "",
        loginSuccess: false,
    }
    componentDidMount() {
        const $ = require('jquery');
        $("input").focus(function(){
            console.log("test");
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
    }
    handleCorreo = event => {
        this.setState({correo: event.target.value});
    }
    handleClave = event => {
        this.setState({clave: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        login(this.state.correo, this.state.clave, this.processResponse);
    }
    processResponse = (loginSuccess, response) => {
        this.setState({alertShow: true, loginSuccess, alertMessage: response.msg});
    }
    render() {
        return (
            <div className="gray-bg">
                <div className="loginColumns animated fadeInDown">
                    <div className="row">
                        <LeftText />
                        <div className="col-md-6">
                            <div className="ibox-content">
                                <SweetAlert
                                    show= {this.state.alertShow}
                                    title= "Konectado"
                                    text= {this.state.alertMessage}
                                    type= {this.state.loginSuccess ? "success" : "error"}
                                    onConfirm= {() => {
                                        this.setState({ alertShow: false });
                                        if (this.state.loginSuccess) {
                                            this.props.childProps.userHasAuthenticated(true);
                                        }
                                    }}
                                />
                                <form className="m-t" role="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group bmd-form-group">
                                        <label className="bmd-label-floating">Correo</label>
                                        <input type="email" onChange={this.handleCorreo} className="form-control" value={this.state.correo} />
                                    </div>
                                    <div className="form-group bmd-form-group">
                                        <label className="bmd-label-floating">Contraseña</label>
                                        <input type="password" onChange={this.handleClave} className="form-control" value={this.state.clave} />
                                    </div>
                                    <button type="submit" className="btn btn-success block full-width m-b">Iniciar sesión</button>
                                    <a href="#">
                                        <small>¿Olvidó su contraseña?</small>
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            Konectado
                        </div>
                        <div className="col-md-6 text-right">
                            <small>© 2019</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const LeftText = () => (
    <div className="col-md-6">
        <h2 className="font-bold">Bienvenido a Konectado</h2>
        <p>Bacon ipsum dolor amet cow bacon meatball fatback chuck. Doner pork chop hamburger ham corned beef.</p> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <p><small>Ribeye venison beef ribs leberkas strip steak pig boudin shoulder fatback short ribs andouille pork loin. Tenderloin drumstick shankle jowl burgdoggen.</small></p>
    </div>
);

export default Login;
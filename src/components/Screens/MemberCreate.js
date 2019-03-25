import React, { Component } from 'react';
import { saveMember } from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

export default class MemberCreate extends Component {

    state = {
        member_id: false,
        name: "",
        email: "",
        phone: "",
        
        response: {},
        success: false,
        alertShow: false,
        loading: false,
    }
    handleName = event => this.setState({name: event.target.value});
    handleEmail = event => this.setState({email: event.target.value});
    handlePhone = event => this.setState({phone: event.target.value});

    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        saveMember(this.state.member_id, this.state.name, this.state.email, this.state.phone, this.handleResponse);
    }
    handleResponse = (success, response) => {
        this.setState({loading: false, alertShow: true, success, response});
        this.prepareForm();
    }

    prepareForm = () => {
        this.props.changeBreadcumb(this.state.local_id ? "Editar socio" : "Crear socio");
        $("input").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.name != "" && $("#name").parent().addClass("is-filled");
        this.state.email != "" && $("#email").parent().addClass("is-filled");
        this.state.phone != "" && $("#phone").parent().addClass("is-filled");
    }
    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const member = this.props.location.state.member;
        if (typeof member != 'undefined') {
            this.setState({
                member_id: member._id,
                name: member.name,
                email: member.email,
                phone: member.phone,
            });
        };
    }
    componentDidMount() {
        this.prepareForm();
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
                            <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Nombre</label>
                            <input id="name" required type="text" maxLength="50" className="form-control" onChange={this.handleName} value={this.state.name} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Correo</label>
                            <input id="email" required type="email" maxLength="50" className="form-control" onChange={this.handleEmail} value={this.state.email} />
                        </div>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="formGroupExampleInput" className="bmd-label-floating">Teléfono</label>
                            <input id="phone" required type="tel" maxLength="15" className="form-control" onChange={this.handlePhone} value={this.state.phone} />
                        </div>
                        <div className="sspaced" />
                        <div className="wrapper-content">
                            <button type="submit" className="btn btn-w-m btn-success">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
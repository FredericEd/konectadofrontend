import React, { Component } from 'react';
import {savePromo} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import { BeatLoader} from 'react-spinners';

const $ = require('jquery');

class PromoCreate extends Component {
    state = {
        promo_id: false,
        position: 1,
        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: false,
    }
    image_file = React.createRef();
    handlePosition = event => this.setState({position: event.target.value});
    componentWillMount() {
        const num = this.props.location.state.num + 1;
        const promo = this.props.location.state.promo;
        if (typeof promo != 'undefined') {
            this.setState({
                promo_id: promo.promo_id,
                image_file: promo.image_file,
                num
            });
        } else this.setState({num});
    }
    
    prepareForm = () => {
        this.props.changeBreadcumb(this.state.promo_id ? "Editar Promo" : "Crear Promo");
        $("input[type=number]").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.position != "" && $("#position").parent().addClass("is-filled");
    }
    componentDidMount() {
        this.prepareForm();
    }
    handleSubmit = event => {
        event.preventDefault();
        if (typeof this.image_file.current.files[0] == "undefined" && this.state.promo_id == false)
            this.setState({alertShow2: true});
        else {
            this.setState({loading: true});
            savePromo(false, this.state.position, this.image_file.current.files[0], this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({alertShow: true, success, response, loading: false});
        this.prepareForm();
    }

    render() {
        return (
            <div>
                <SweetAlert
                    show= {this.state.alertShow}
                    title= "Smart Tótem"
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
                        <div className="row">
                            <div className="form-group bmd-form-group col-sm-2">
                                <label className="bmd-label-floating">Posición</label>
                                <input id="position" required type="number" maxLength="2" min="1" max={this.state.num} className="form-control" onChange={this.handlePosition} step="1" value={this.state.position} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-10">
                                <label className="margined-right">Imagen:</label>
                                <input type="file" className="sspaced" ref={this.image_file}  />
                            </div>
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
export default PromoCreate;
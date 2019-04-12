import React, { Component } from 'react';
import Card from "../Elements/Card";
import CardCreate from "./CardCreate";
import { Link, Switch, Route } from "react-router-dom";
import {getCards, deleteCard} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { BeatLoader} from 'react-spinners';

class Cards extends Component {

    state = {
        subtitle: "Tarjeta de afiliación",
        store: {},
    }
    componentWillMount(){
        if (typeof this.props.location.state == 'undefined' || typeof this.props.location.state.store == 'undefined') {
            this.props.history.push("/");
            return;
        }
        this.setState({store: this.props.location.state.store});
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-9">
                        <h2>Tarjeta de afiliación</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/stores/cards">
                                    {this.state.store.name}
                                </Link>
                            </li>
                            <li className="active">
                                <strong>{this.state.subtitle}</strong>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Switch>
                        <Route path={`${this.props.match.path}/create`} render={props => <CardCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
                        <Route exact path={this.props.match.path} render={props => <Listado {...props} store={this.state.store} changeBreadcumb={this.changeBreadcumb} />}/>
                    </Switch>
                </div>
            </div>
        );
    }

    changeBreadcumb = (subtitle) => subtitle != this.state.subtitle && this.setState({subtitle});
}

class Listado extends Component {
    state = {
        elements: [],
        alertShow: false,
        alertShow2: false,
        alertShow3: false,
        success: false,
        card_id: false,
        response: {},
        loading: true,
    }
    componentDidMount() {
        this.props.changeBreadcumb("Tarjeta de afiliación");
        getCards(this.props.store._id, this.processResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, card_id: false});
    handleDeleteRequest = card_id => this.setState({alertShow: true, card_id});
    processResponse = elements => {
        console.log(elements);
        this.setState({elements, loading: false});
    }
    
    render() {
        return (<div>
            <SweetAlert
                show= {this.state.alertShow}
                title= "SmartTotem"
                text= "¿Está seguro de que desea eliminar este elemento?"
                type= "warning"
                showCancelButton
                onConfirm= {() => {
                    this.setState({ alertShow: false, loading: true });
                    deleteCard(this.props.store._id, this.state.card_id, this.handleResponse);
                }}
                onCancel={() => this.setState({alertShow: false})}
            />
            <SweetAlert
                show= {this.state.alertShow2}
                title= "SmartTotem"
                text= {this.state.response.msg}
                type= {this.state.success ? "success" : "error"}
                onConfirm= {() => {
                    this.setState({ alertShow2: false });
                    this.state.success && getCards(this.props.store._id, this.processResponse);
                }}
            />
            <SweetAlert
                show= {this.state.alertShow3}
                title= "SmartTotem"
                text= "Código copiado exitosamente"
                type= "success"
                onConfirm= {() => {
                    this.setState({ alertShow3: false});
                }}
            />
            <div className='sweet-loading text-center'>
                <BeatLoader
                    sizeUnit={"px"} size={20} color={'#007EC7'}
                    loading={this.state.loading} />
            </div>
            {!this.state.loading && (
                <div>
                    <div className="text-right spaced">
                        <Link to={{pathname: `${this.props.match.path}/create`, state: {store_id: this.props.store._id}}}>
                            <button type="button" className="btn btn-w-m btn-success">Crear nueva tarjeta de afiliación</button>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            <div className="row">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Inicio</th>
                                            <th>Final</th>
                                            <th>Producto</th>
                                            <th>Stickers para ganar</th>
                                            <th>Premios canjedos</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.elements.length == 0 && (
                                            <tr><td colSpan={6}><em>Aún no se han creado tarjetas de afiliación para el presente afiliado.</em></td></tr>
                                        )}
                                        {this.state.elements.map(card => <Card card={card} key={card._id} handleDeleteRequest={this.handleDeleteRequest} copyToClipboard={this.copyToClipboard} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>);
    }
}

export default Cards;
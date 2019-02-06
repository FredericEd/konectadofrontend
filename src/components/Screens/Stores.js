import React, { Component } from 'react';
import Store from "../Elements/Store";
import StoreCreate from "../Screens/StoreCreate";
import { Link, Switch, Route } from "react-router-dom";
import {getStores} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import {deleteStore} from '../../actions/apiFunctions';

class Stores extends Component {

    state = {
        subtitle: "Afiliados",
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-9">
                        <h2>Afiliados</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/stores">
                                    Home
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
                        <Route path={`${this.props.match.path}/create`} render={props => <StoreCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
                        <Route exact path={this.props.match.path} render={props => <Listado {...props} changeBreadcumb={this.changeBreadcumb} />}/>
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
        success: false,
        store_id: false,
        response: {},
    }
    componentDidMount() {
        this.props.changeBreadcumb("Afiliados");
        getStores(this.processResponse);
    }
    handleDeleteResponse = (success, response) => this.setState({alertShow2: true, success, response});
    handleDeleteRequest = store_id => this.setState({alertShow: true, store_id});
    processResponse = elements => this.setState({elements});
    
    render() {
        return (
            <div>
                <SweetAlert
                    show= {this.state.alertShow}
                    title= "Konectado"
                    text= "¿Está seguro de que desea eliminar este elemento?"
                    type= "warning"
                    showCancelButton
                    onConfirm= {() => {
                        this.setState({ alertShow: false });
                        deleteStore(this.state.store_id, this.handleDeleteResponse);
                    }}
                    onCancel={() => this.setState({alertShow: false})}
                />
                <SweetAlert
                    show= {this.state.alertShow2}
                    title= "Konectado"
                    text= {this.state.response.msg}
                    type= {this.state.success ? "success" : "error"}
                    onConfirm= {() => {
                        this.setState({ alertShow2: false });
                        this.state.success && getStores(this.processResponse);
                    }}
                />
                <div className="text-right spaced">
                    <Link to={{pathname: "/stores/create", state: {}}}>
                        <button type="button" className="btn btn-w-m btn-success">Crear nuevo afiliado</button>
                    </Link>
                </div>
                <div className="row">
                    {this.state.elements.map(store => <Store store={store} handleDeleteRequest={this.handleDeleteRequest} changeBreadcumb={this.props.changeBreadcumb} key={store._id} />)}
                </div>
            </div>
        );
    }
}

export default Stores;
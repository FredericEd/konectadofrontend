import React, { Component } from 'react';
import Store from "../Elements/Store";
import StoreCreate from "../Screens/StoreCreate";
import { Link, Switch, Route } from "react-router-dom";

class Stores extends Component {

    state = {
        subtitle: "Afliados",
        stores: [{},{},{},{},{},{}],
    }
    render() {
        return (
            <div>
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-9">
                        <h2>Afliados</h2>
                        <ol class="breadcrumb">
                            <li>
                                Home
                            </li>
                            <li class="active">
                                <strong>{this.state.subtitle}</strong>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <Switch>
                        <Route path={`${this.props.match.path}/create`} component={() => <StoreCreate changeBreadcumb={this.changeBreadcumb} />} />
                        <Route exact path={this.props.match.path} render={() => <Listado stores={this.state.stores} changeBreadcumb={this.changeBreadcumb} />}/>
                    </Switch>
                </div>
            </div>
        );
    }

    changeBreadcumb = (subtitle) => subtitle != this.state.subtitle && this.setState({subtitle});
}
const Listado = props => {
    props.changeBreadcumb("Afiliados");
    return (<div>
        <div className="text-right spaced">
            <Link to="./stores/create">
                <button type="button" className="btn btn-w-m btn-success">Crear nuevo afiliado</button>
            </Link>
        </div>
        <div className="row">
            {props.stores.map(store => <Store />)}
        </div>
    </div>);
}

export default Stores;
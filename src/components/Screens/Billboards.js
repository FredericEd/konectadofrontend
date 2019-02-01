import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";

import Billboard from "../Elements/Billboard";
import Datatable from "../Elements/Datatable";
import BillboardCreate from "../Screens/BillboardCreate";

class Billboards extends Component {
    state = {
        subtitle: "Billboards",
        headers: [{
            title: 'Dirección',
            data: 'address'
            },
            {
                title: 'Ciudad',
                data: 'city'
            }],
        billboards: [{address: "Freddy", city: "fred"},{address: "Eduardo", city: "edu"},{address: "John", city: "zrvf"},{address: "Tomas", city: "aarc"}],
    }
    render() {
        return (
            <div>
                <div class="row wrapper border-bottom white-bg page-heading divbread">
                    <div class="col-lg-9">
                        <h2>Billboards</h2>
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
                <Switch>
                    <Route path={`${this.props.match.path}/create`} component={() => <BillboardCreate changeBreadcumb={this.changeBreadcumb} />} />
                    <Route exact path={this.props.match.path} render={() => <Listado headers={this.state.headers} billboards={this.state.billboards} changeBreadcumb={this.changeBreadcumb} />}/>
                </Switch>
            </div>
        );
    }

    changeBreadcumb = (subtitle) => subtitle != this.state.subtitle && this.setState({subtitle});
}
const Listado = props => {
    props.changeBreadcumb("Billboards");
    return (<div>
        <div className="text-right">
            <Link to="./billboards/create">
                <button type="button" className="btn btn-w-m btn-success">Crear nuevo billboard</button>
            </Link>
        </div>
        <Datatable headers={props.headers} values={props.billboards}/>
        {/*<div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>User</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.billboards.map(data => <Billboard />)}
                    </tbody>
                </table>
            </div>
        </div>*/}
    </div>);
}
export default Billboards;
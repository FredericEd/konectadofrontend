import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import {getBillboards, deleteBillboard, getCiudades } from '../../actions/apiFunctions';
import Billboard from "../Elements/Billboard";
import Datatable from "../Elements/Datatable";
import BillboardCreate from "./BillboardCreate";
import SweetAlert from 'sweetalert-react';
import { BeatLoader } from 'react-spinners';

class Billboards extends Component {
    state = {
        subtitle: "Tótems",
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading divbread">
                    <div className="col-lg-9">
                        <h2>Tótems</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/billboards">
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
                        <Route path={`${this.props.match.path}/create`} render={props => <BillboardCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
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
        ciudades: [],
        city_id: "",
        alertShow: false,
        alertShow2: false,
        success: false,
        billboard_id: false,
        response: {},
        loading: true,
        /*headers: [{
            title: 'Dirección',
            data: 'address'
            },
            {
                title: 'Ciudad',
                data: 'city'
            }],*/
    }
    componentDidMount() {
        this.props.changeBreadcumb("Tótems");
        getCiudades(this.handleCiudadesResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, billboard_id: false});
    handleDeleteRequest = billboard_id => this.setState({alertShow: true, billboard_id});
    processResponse = elements => {
        this.setState({elements, loading: false});
    }
    handleCiudadesResponse = ciudades => {
        this.setState({ciudades});
        getBillboards(this.state.city_id, this.processResponse);
    }
    handleCiudad = event => {
        this.setState({city_id: event.target.value, loading: true});
        getBillboards(event.target.value, this.processResponse);
    }
    render () {
        return (<div>
            <SweetAlert
                show= {this.state.alertShow}
                title= "Smart Tótem"
                text= "¿Está seguro de que desea eliminar este elemento?"
                type= "warning"
                showCancelButton
                onConfirm= {() => {
                    this.setState({ alertShow: false, loading: true });
                    deleteBillboard(this.state.billboard_id, this.handleResponse);
                }}
                onCancel={() => this.setState({alertShow: false})}
            />
            <SweetAlert
                show= {this.state.alertShow2}
                title= "Smart Tótem"
                text= {this.state.response.msg}
                type= {this.state.success ? "success" : "error"}
                onConfirm= {() => {
                    this.setState({ alertShow2: false });
                    this.state.success && getBillboards(this.state.city_id, this.processResponse);
                }}
            />
            <div className='sweet-loading text-center'>
                <BeatLoader
                    sizeUnit={"px"} size={20} color={'#007EC7'}
                    loading={this.state.loading} />
            </div>
            {!this.state.loading && (
                <div>
                    <div className="row">
                        <div className="col-sm-6">
                            <select className="form-control" value={this.state.city_id} onChange={this.handleCiudad}>
                                <option value="">Todas las ciudades</option>
                                {this.state.ciudades.map(ciudad => <option key={ciudad._id} value={ciudad._id}>{ciudad.name}</option>)}
                            </select>
                        </div>
                        <div className="text-right col-sm-6">
                            <Link  to={{pathname: "./billboards/create", state: {}}}>
                                <button type="button" className="btn btn-w-m btn-success">Crear nuevo tótem</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            <div className="row">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Ciudad</th>
                                            <th>Dirección</th>
                                            <th>Mensaje</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.elements.length == 0 && (
                                            <tr><td colSpan={3}><em>La búsqueda no produjo resultados.</em></td></tr>
                                            )}
                                        {this.state.elements.map(billboard => <Billboard billboard={billboard} key={billboard._id} handleDeleteRequest={this.handleDeleteRequest} />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/*<Datatable headers={props.headers} values={props.billboards}/>
            <div className="wrapper wrapper-content animated fadeInRight">
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
}
export default Billboards;
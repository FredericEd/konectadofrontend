import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import {getBillboards, deleteBillboard} from '../../actions/apiFunctions';
import Billboard from "../Elements/Billboard";
import Datatable from "../Elements/Datatable";
import BillboardCreate from "../Screens/BillboardCreate";
import SweetAlert from 'sweetalert-react';
import { BeatLoader} from 'react-spinners';

class Billboards extends Component {
    state = {
        subtitle: "Billboards",
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading divbread">
                    <div className="col-lg-9">
                        <h2>Billboards</h2>
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
        this.props.changeBreadcumb("Billboards");
        getBillboards(this.processResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, billboard_id: false});
    handleDeleteRequest = billboard_id => this.setState({alertShow: true, billboard_id});
    processResponse = elements => this.setState({elements, loading: false});

    render () {
        return (<div>
            <SweetAlert
                show= {this.state.alertShow}
                title= "Konectado"
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
                title= "Konectado"
                text= {this.state.response.msg}
                type= {this.state.success ? "success" : "error"}
                onConfirm= {() => {
                    this.setState({ alertShow2: false });
                    this.state.success && getBillboards(this.processResponse);
                }}
            />
            <div className='sweet-loading text-center'>
                <BeatLoader
                    sizeUnit={"px"} size={20} color={'#007EC7'}
                    loading={this.state.loading} />
            </div>
            {!this.state.loading && (
                <div>
                    <div className="text-right">
                        <Link  to={{pathname: "./billboards/create", state: {}}}>
                            <button type="button" className="btn btn-w-m btn-success">Crear nuevo billboard</button>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            <div className="row">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Ciudad</th>
                                            <th>Dirección</th>
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
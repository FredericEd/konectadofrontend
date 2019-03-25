import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import { getMembers, deleteMember } from '../../actions/apiFunctions';
import Member from "../Elements/Member";
import MemberCreate from "./MemberCreate";
import SweetAlert from 'sweetalert-react';
import { BeatLoader } from 'react-spinners';

class Members extends Component {
    state = {
        subtitle: "Socios",
    }
    render() {
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading divbread">
                    <div className="col-lg-9">
                        <h2>Socios</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/members">
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
                        <Route path={`${this.props.match.path}/create`} render={props => <MemberCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
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
        member_id: false,
        response: {},
        loading: true,
    }
    componentDidMount() {
        this.props.changeBreadcumb("Socios");
        getMembers(this.processResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, member_id: false});
    handleDeleteRequest = member_id => this.setState({alertShow: true, member_id});
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
                    deleteMember(this.state.member_id, this.handleResponse);
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
                    this.state.success && getMembers(this.processResponse);
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
                        <div className="text-right">
                            <Link  to={{pathname: "./members/create", state: {}}}>
                                <button type="button" className="btn btn-w-m btn-success">Crear nuevo socio</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            <div className="row">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Teléfono</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.elements.length == 0 && (
                                            <tr><td colSpan={3}><em>La búsqueda no produjo resultados.</em></td></tr>
                                            )}
                                        {this.state.elements.map(member => <Member member={member} key={member._id} handleDeleteRequest={this.handleDeleteRequest} />)}
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
export default Members;
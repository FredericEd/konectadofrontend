import React, { Component } from 'react';
import Coupon from "../Elements/Coupon";
import CouponCreate from "./CouponCreate";
import { Link, Switch, Route } from "react-router-dom";
import {getCoupons, deleteCoupon} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { BeatLoader} from 'react-spinners';

class Locales extends Component {

    state = {
        subtitle: "Cupones",
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
                        <h2>Cupones</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/stores/cupones">
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
                        <Route path={`${this.props.match.path}/create`} render={props => <CouponCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
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
        success: false,
        coupon_id: false,
        response: {},
        loading: true,
    }
    componentDidMount() {
        this.props.changeBreadcumb("Cupones");
        getCoupons(this.props.store._id, this.processResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, coupon_id: false});
    handleDeleteRequest = coupon_id => this.setState({alertShow: true, coupon_id});
    processResponse = elements => {
        console.log(elements);
        this.setState({elements, loading: false});
    }
    
    render() {
        return (<div>
            <SweetAlert
                show= {this.state.alertShow}
                title= "Konectado"
                text= "¿Está seguro de que desea eliminar este elemento?"
                type= "warning"
                showCancelButton
                onConfirm= {() => {
                    this.setState({ alertShow: false, loading: true });
                    deleteCoupon(this.props.store._id, this.state.coupon_id, this.handleResponse);
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
                    this.state.success && getCoupons(this.props.store._id, this.processResponse);
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
                            <button type="button" className="btn btn-w-m btn-success">Crear nuevo cupón</button>
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
                                            <th>Máximos usos</th>
                                            <th>Descuento</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.elements.length == 0 && (
                                            <tr><td colSpan={6}><em>Aún no se han creado cupones para el presente afiliado.</em></td></tr>
                                        )}
                                        {this.state.elements.map(coupon => <Coupon coupon={coupon} key={coupon._id} handleDeleteRequest={this.handleDeleteRequest} />)}
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

export default Locales;
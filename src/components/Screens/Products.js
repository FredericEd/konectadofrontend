import React, { Component } from 'react';
import Product from "../Elements/Product";
import ProductCreate from "./ProductCreate";
import { Link, Switch, Route } from "react-router-dom";
import {getProducts, deleteProduct} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { BeatLoader} from 'react-spinners';

class Locales extends Component {

    state = {
        subtitle: "Productos",
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
                        <h2>Productos</h2>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/stores/productos">
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
                        <Route path={`${this.props.match.path}/create`} render={props => <ProductCreate {...props} changeBreadcumb={this.changeBreadcumb} />} />
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
        product_id: false,
        response: {},
        loading: true,
    }
    componentDidMount() {
        this.props.changeBreadcumb("Productos");
        getProducts(this.props.store._id, this.processResponse);
    }
    handleResponse = (success, response) => this.setState({alertShow2: true, success, response, product_id: false});
    handleDeleteRequest = product_id => this.setState({alertShow: true, product_id});
    processResponse = elements => this.setState({elements, loading: false});
    
    render() {
        return (<div>
            <SweetAlert
                show= {this.state.alertShow}
                title= "Smart Tótem"
                text= "¿Está seguro de que desea eliminar este elemento?"
                type= "warning"
                showCancelButton
                onConfirm= {() => {
                    this.setState({ alertShow: false, loading: true });
                    deleteProduct(this.props.store._id, this.state.product_id, this.handleResponse);
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
                    this.state.success && getProducts(this.props.store._id, this.processResponse);
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
                            <button type="button" className="btn btn-w-m btn-success">Crear nuevo producto</button>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            <div className="row">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Descripción</th>
                                            <th>Operaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.elements.length == 0 && (
                                            <tr><td colSpan={4}><em>Aún no se han creado productos para el presente afiliado.</em></td></tr>
                                        )}
                                        {this.state.elements.map(product => <Product product={product} key={product._id} handleDeleteRequest={this.handleDeleteRequest} />)}
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
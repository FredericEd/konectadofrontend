import React, { Component } from 'react';
import { saveCard, getProducts, getLocales } from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import DatePicker from "react-datepicker";
import { BeatLoader} from 'react-spinners';

class CardCreate extends Component {

    state = {
        card_id: false,
        store_id: 0,
        product_id: 0,
        start: new Date(),
        end: new Date(),
        counter_max: 1,
        counter_gift: 1,
        products: [],
        locales: [],
        selected_locales: new Set(),
        today: new Date(),
        errmessage: "",

        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: true,
    }

    handleStart = start  => this.setState({start});
    handleEnd = end => this.setState({end});
    handleCounterMax = event => this.setState({counter_max: event.target.value});
    handleCounterGift = event => this.setState({counter_gift: event.target.value});
    handleProduct = event => this.setState({product_id: event.target.value});

    handleCheckLocal = event => {
        const target = event.target;
        const newSet  = this.state.selected_locales;
        target.checked ? newSet.add(target.id) : newSet.delete(target.id);
        this.setState({selected_locales: newSet});
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.product_id == "0")
            this.setState({alertShow2: true, errmessage: "¡Debe elegir un producto para guardar el cupón!"});
        else if (this.state.selected_locales.size == 0) {
            this.setState({alertShow2: true, errmessage: "¡Debe elegir al menos un local!"});
        } else {
            let start = this.state.start;
            let dd = start.getDate() < 10 ? ('0' + start.getDate()) : start.getDate();
            let mm = start.getMonth() + 1;
            mm < 10 && (mm = '0' + mm);
            start = dd + '/' + mm + '/' + start.getFullYear();
            
            let end = this.state.end;
            dd = end.getDate() < 10 ? ('0' + end.getDate()) : end.getDate();
            mm = end.getMonth() + 1;
            mm < 10 && (mm = '0' + mm);
            end = dd + '/' + mm + '/' + end.getFullYear();

            this.setState({loading: true});
            saveCard(this.state.card_id, this.state.store_id, this.state.product_id, start, end, this.state.counter_max, this.state.counter_gift, Array.from(this.state.selected_locales).join(), this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({loading: false, alertShow: true, success, response});
        this.prepareForm();
    }
    handleProductsResponse = products => {
        this.setState({products});
        this.state.card_id && this.setState({product_id: this.props.location.state.card.product._id});
        getLocales(this.state.store_id, this.handleLocalesResponse);
    }
    handleLocalesResponse = locales => {
        this.setState({locales, loading: false});
        this.prepareForm();
    }
    handleCheckLocalAll = event => {
        const target = event.target;
        const newSet = new Set();
        if (target.checked) {
            for (let local of this.state.locales)
                newSet.add(local._id);
        }
        this.setState({selected_locales: newSet});
    }

    prepareForm = () => {
        const $ = require('jquery');
        this.props.changeBreadcumb(this.state.card_id ? "Editar tarjeta de afiliación" : "Crear tarjeta de afiliación");
        $("input[type=number]").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.counter_max !== "" && $("#counter_max").parent().addClass("is-filled");
        this.state.counter_gift !== "" && $("#counter_gift").parent().addClass("is-filled");
    }
    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const card = this.props.location.state.card;
        if (typeof card != 'undefined') {
            const start = new Date([...card.start.split("/").reverse()]);
            const end = new Date([...card.end.split("/").reverse()]);
            const locales = new Set();
            for (let local of card.locals)
                locales.add(local._id);
            this.setState({
                card_id: card._id,
                store_id: card.store_id,
                start, end,
                counter_max: card.counter_max,
                counter_gift: card.counter_gift,
                selected_locales: locales,
            });
            getProducts(card.store_id, this.handleProductsResponse);
        } else {
            this.setState({store_id: this.props.location.state.store_id});
            getProducts(this.props.location.state.store_id, this.handleProductsResponse);
        }
    }

    render() {
        return (
            <div>
                <SweetAlert
                    show= {this.state.alertShow}
                    title= "SmartTotem"
                    text= {this.state.response.msg}
                    type= {this.state.success ? "success" : "error"}
                    onConfirm= {() => {
                        this.setState({ alertShow: false });
                        this.state.success && this.props.history.goBack();
                    }}
                />
                <Alert fade={false} color="danger" isOpen={this.state.alertShow2} toggle={() => this.setState({  alertShow2: false })}>{this.state.errmessage}</Alert>
                <div className='sweet-loading text-center'>
                    <BeatLoader
                        sizeUnit={"px"} size={20} color={'#007EC7'}
                        loading={this.state.loading} />
                </div>
                {!this.state.loading && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group bmd-form-group col-sm-4">
                                <label className="margined-right">Inicio:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    minTime={this.state.today}
                                    selected={this.state.start}
                                    onChange={this.handleStart} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-4">
                                <label className="margined-right">Final:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    minTime={this.state.today}
                                    selected={this.state.end}
                                    onChange={this.handleEnd} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group bmd-form-group col-sm-6 col-md-3">
                                <label htmlFor="counter_max" className="bmd-label-floating"> Stickers para ganar</label>
                                <input min="1" step="1" required type="number" className="form-control" onChange={this.handleCounterMax} id="counter_max" value={this.state.counter_max} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-6 col-md-3">
                                <label htmlFor="counter_gift" className="bmd-label-floating"> Cantidad de premios</label>
                                <input min="1" step="1" required type="number" className="form-control" onChange={this.handleCounterGift} id="counter_gift" value={this.state.counter_gift} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-12 col-md-6">
                                <select className="form-control" value={this.state.product_id} onChange={this.handleProduct} >
                                    <option value="0">Elija el producto</option>
                                    {this.state.products.map(product => <option key={product._id} value={product._id}>{product.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="sspaced" />
                        <div className="row">
                            <h3>Locales</h3>
                            {this.state.locales.length == 0 && (
                                <em>No se han creado locales.</em>
                            )}
                            {this.state.locales.length > 0 && (
                                <div className="form-check col-sm-6 col-md-4">
                                    <input className="form-check-input" type="checkbox" id="todos" onChange={this.handleCheckLocalAll} />
                                    <label className="form-check-label" htmlFor="todos">
                                        Elegir todos
                                    </label>
                                </div>
                            )}
                            {this.state.locales.map(local =>
                                <div className="form-check col-sm-6 col-md-4" key={local._id}>
                                    <input className="form-check-input" type="checkbox" id={local._id} onChange={this.handleCheckLocal} checked={this.state.selected_locales.has(local._id)} />
                                    <label className="form-check-label" htmlFor={local._id}>
                                        {local.name}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="sspaced" />
                        <div className="wrapper-content">
                            <button type="submit" className="btn btn-w-m btn-success">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
export default CardCreate;
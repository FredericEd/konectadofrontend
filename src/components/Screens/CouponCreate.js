import React, { Component } from 'react';
import {saveCoupon, getProducts} from '../../actions/apiFunctions';
import SweetAlert from 'sweetalert-react';
import { Alert } from 'reactstrap';
import DatePicker from "react-datepicker";
import { BeatLoader} from 'react-spinners';

class CouponCreate extends Component {

    state = {
        coupon_id: false,
        store_id: 0,
        product_id: 0,
        start: "",
        end: "",
        counter_max: 0,
        discount: 0,
        products: [{_id: 65464, name: "Product 1"}],
        today: "",

        response: {},
        success: false,
        alertShow: false,
        alertShow2: false,
        loading: true,
    }

    handleStart = start  => this.setState({start});
    handleEnd = end => this.setState({end});
    handleCounterMax = event => this.setState({counter_max: event.target.value});
    handleDiscount = event => this.setState({discount: event.target.value});
    handleProduct = event => this.setState({product_id: event.target.value});
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.product_id == "0")
            this.setState({alertShow2: true});
        else {
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
            saveCoupon(this.state.coupon_id, this.state.store_id, this.state.product_id, start, end, this.state.counter_max, this.state.discount, this.handleResponse);
        }
    }
    handleResponse = (success, response) => {
        this.setState({loading: false, alertShow: true, success, response});
        console.log(response);
    }
    handleProductsResponse = products => {
        this.setState({products, loading: false});
        this.state.coupon_id && this.setState({product_id: this.props.location.state.coupon.product._id});
    }

    componentWillMount() {
        if (typeof this.props.location.state == 'undefined') {
            this.props.history.push("/");
            return;
        }
        const coupon = this.props.location.state.coupon;
        if (typeof coupon != 'undefined') {
            const start = new Date([...coupon.start.split("/").reverse()]);
            const end = new Date([...coupon.end.split("/").reverse()]);
            this.setState({
                coupon_id: coupon._id,
                store_id: coupon.store_id,
                start, end,
                counter_max: coupon.counter_max,
                discount: coupon.discount,
            });
        } else {
            let today = new Date();
            /*let dd = today.getDate();
            let mm = today.getMonth() + 1;
            dd < 10 && (dd = '0' + dd);
            mm < 10 && (mm = '0' + mm);
            today = dd + '/' + mm + '/' + today.getFullYear();*/
            this.setState({store_id: this.props.location.state.store_id, start: today, end: today, today});
        }
    }
    componentDidMount() {
        const $ = require('jquery');
        this.props.changeBreadcumb(this.state.coupon_id ? "Editar cupón" : "Crear cupón");
        getProducts(this.state.store_id, this.handleProductsResponse);
        $("input[type=number]").focus(function(){
            $(this).parent().addClass("is-focused");
            $(this).parent().removeClass("is-filled");
         
        }).blur(function(){
            $(this).val() !== "" && $(this).parent().addClass("is-filled");
            $(this).parent().removeClass("is-focused");
        });
        this.state.counter_max !== "" && $("#counter_max").parent().addClass("is-filled");
        this.state.discount !== "" && $("#discount").parent().addClass("is-filled");
    }

    render() {
        return (
            <div>
                <SweetAlert
                    show= {this.state.alertShow}
                    title= "Konectado"
                    text= {this.state.response.msg}
                    type= {this.state.success ? "success" : "error"}
                    onConfirm= {() => {
                        this.setState({ loading: false });
                        this.state.success && this.props.history.goBack();
                    }}
                />
                <Alert fade={false} color="danger" isOpen={this.state.alertShow2} toggle={() => this.setState({  alertShow2: false })}>
                    ¡Debe elegir un producto para guardar el cupón!
                </Alert>
                <div className='sweet-loading text-center'>
                    <BeatLoader
                        sizeUnit={"px"} size={20} color={'#007EC7'}
                        loading={this.state.loading} />
                </div>
                {!this.state.loading && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group bmd-form-group col-sm-6">
                                <label className="margined-right">Inicio:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    minTime={this.state.today}
                                    selected={this.state.start}
                                    onChange={this.handleStart} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-6">
                                <label className="margined-right">Final:</label>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    minTime={this.state.today}
                                    selected={this.state.end}
                                    onChange={this.handleEnd} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group bmd-form-group col-sm-6">
                                <label htmlFor="counter_max" className="bmd-label-floating"> Máximos usos</label>
                                <input min="0" step="1" required type="number" className="form-control" onChange={this.handleCounterMax} id="counter_max" value={this.state.counter_max} />
                            </div>
                            <div className="form-group bmd-form-group col-sm-6">
                                <label htmlFor="discount" className="bmd-label-floating"> Descuento</label>
                                <input min="0" step="1" required type="number" className="form-control" onChange={this.handleDiscount} id="discount" value={this.state.discount} />
                            </div>
                        </div>
                        <select className="form-control" value={this.state.product_id} onChange={this.handleProduct} >
                            <option value="0">Elija el producto</option>
                            {this.state.products.map(product => <option key={product._id} value={product._id}>{product.name}</option>)}
                        </select>
                        <div className="wrapper-content">
                            <button type="submit" className="btn btn-w-m btn-success">Guardar</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
export default CouponCreate;
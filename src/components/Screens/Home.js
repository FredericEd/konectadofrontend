import React, { Component } from 'react';
import CanvasJSReact  from '../../canvasjs/canvasjs.react';
import { BeatLoader } from 'react-spinners';
import { getReportes } from '../../actions/apiFunctions';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Home extends Component {

    state = {
        elements: [],
        reduced: {stores: 0, locals: 0, coupons: 0, coupons_billboards: 0, coupons_members: 0, scanned_coupons: 0, users: 0, billboards: 0, members: 0, devices: 0},
        puntos: [],
        loading: false,
    }
    componentDidMount() {
        getReportes(this.processResponse);
    }
    processResponse = elements => {
        const reduced = this.state.reduced;
        for (let mes of elements) {
            reduced.stores += mes.stores.activated;
            reduced.locals += mes.locals.activated;
            reduced.coupons += mes.coupons.activated;
            reduced.coupons_billboards += mes.coupons_billboards;
            reduced.coupons_members += mes.coupons_members;
            reduced.scanned_coupons += mes.scanned_coupons;
            reduced.users += mes.users;
            reduced.billboards += mes.billboards.activated;
            reduced.members += mes.members.activated;
            reduced.devices += mes.devices.activated;
        }
        const puntos = elements.map(mes => { return {x: new Date(mes.date + "-01"), y: mes.scanned_coupons}});
        this.setState({elements, puntos, reduced, loading: false});
    }
    render() {
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Cupones canjeados por mes"
			},
			axisY: {
				title: "Total",
				includeZero: true,
				interval: 1,
			},
			axisX: {
				title: "Fecha",
				interval: 1,
			},
			data: [{
				type: "area",
				toolTipContent: "Mes {x}: {y}",
				dataPoints: this.state.puntos,
			}]
		}
        return (
            <div className="wrapper wrapper-content">
                <div className='sweet-loading text-center'>
                    <BeatLoader
                        sizeUnit={"px"} size={20} color={'#007EC7'}
                        loading={this.state.loading} />
                </div>
                {!this.state.loading && (
                <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title"> 
                                <span className="label label-success pull-right">Total</span>
                                <h5>Alcance</h5> 
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.reduced.users}</h1>
                                {/*<div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>*/}
                                <small>Usuarios registrados</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-info pull-right">Total</span>
                                <h5>Cobertura</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.reduced.billboards}</h1>
                                <small>Tótems creados</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-primary pull-right">Total</span>
                                <h5>Servicios</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.reduced.members}</h1>
                                <small>Afiliados activos</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-9" style={{minHeight:"450px"}}>
                                        <div className="flot-chart">
                                        <CanvasJSChart options = {options} /* onRef={ref => this.chart = ref} */ />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <ul className="stat-list">
                                            <li>
                                                <h2 className="no-margins">{this.state.reduced.coupons}</h2>
                                                <small>Total cupones</small>
                                                <div className="stat-percent">100% <i className="fa fa-bolt text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: "100%"}} className="progress-bar"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <h2 className="no-margins ">{this.state.reduced.coupons_billboards}</h2>
                                                <small>Cupones en tótems</small>
                                                <div className="stat-percent">{this.state.reduced.coupons_billboards / this.state.reduced.coupons * 100}% <i className="fa fa-bolt text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: (this.state.reduced.coupons_billboards / this.state.reduced.coupons * 100) + "%"}} className="progress-bar"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <h2 className="no-margins ">{this.state.reduced.coupons_members}</h2>
                                                <small>Cupones premium</small>
                                                <div className="stat-percent">{this.state.reduced.coupons_members / this.state.reduced.coupons * 100}% <i className="fa fa-bolt text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: (this.state.reduced.coupons_members / this.state.reduced.coupons * 100) + "%"}} className="progress-bar"></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                )}
            </div>
        );
    }
}

export default Home;
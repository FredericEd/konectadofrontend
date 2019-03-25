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
        puntos2: [],
        puntos3: [],
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
        const puntos2 = elements.map(mes => { return {x: new Date(mes.date + "-01"), y: mes.coupons_members}});
        const puntos3 = elements.map(mes => { return {x: new Date(mes.date + "-01"), y: mes.users}});
        this.setState({elements, puntos, puntos2, puntos3, reduced, loading: false});
    }
    render() {
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{ text: "Cupones canjeados por mes" },
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
        const options2 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title:{ text: "Cupones premium por mes" },
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
				dataPoints: this.state.puntos2,
			}]
		}
        const options3 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title:{ text: "Usuarios registrados por mes" },
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
				dataPoints: this.state.puntos3,
			}]
		}
        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading divbread">
                    <div className="col-lg-9">
                        <h2>Reportes</h2>
                    </div>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className='sweet-loading text-center'>
                        <BeatLoader
                            sizeUnit={"px"} size={20} color={'#007EC7'}
                            loading={this.state.loading} />
                    </div>
                    {!this.state.loading && (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ibox float-e-margins">
                                <div className="row">
                                    <div className="col-lg-12" style={{minHeight:"450px"}}>
                                        <div className="flot-chart">
                                            <CanvasJSChart options = {options} /* onRef={ref => this.chart = ref} */ />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12" style={{minHeight:"450px"}}>
                                        <div className="flot-chart">
                                            <CanvasJSChart options = {options2} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12" style={{minHeight:"450px"}}>
                                        <div className="flot-chart">
                                            <CanvasJSChart options = {options3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
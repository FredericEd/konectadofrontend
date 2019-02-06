import React, { Component } from 'react';

class Home extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row">
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-success pull-right">Total</span>
                                <h5>Alcance</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">6,200</h1>
                                <div className="stat-percent font-bold text-success">98% <i className="fa fa-bolt"></i></div>
                                <small>Usuarios registrados</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-info pull-right">Total</span>
                                <h5>Cupones</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">5,800</h1>
                                <div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up"></i></div>
                                <small>Cupones usados</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-primary pull-right">Total</span>
                                <h5>Afiliados</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">106</h1>
                                <div className="stat-percent font-bold text-navy">44% <i className="fa fa-level-up"></i></div>
                                <small>Locales activos</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Orders</h5>
                                <div className="pull-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-xs btn-white active">Today</button>
                                        <button type="button" className="btn btn-xs btn-white">Monthly</button>
                                        <button type="button" className="btn btn-xs btn-white">Annual</button>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="flot-chart">
                                            <div className="flot-chart-content" id="flot-dashboard-chart"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <ul className="stat-list">
                                            <li>
                                                <h2 className="no-margins">2,346</h2>
                                                <small>Total orders in period</small>
                                                <div className="stat-percent">48% <i className="fa fa-level-up text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: "48%"}} className="progress-bar"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <h2 className="no-margins ">4,422</h2>
                                                <small>Orders in last month</small>
                                                <div className="stat-percent">60% <i className="fa fa-level-down text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: "60%"}} className="progress-bar"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <h2 className="no-margins ">9,180</h2>
                                                <small>Monthly income from orders</small>
                                                <div className="stat-percent">22% <i className="fa fa-bolt text-navy"></i></div>
                                                <div className="progress progress-mini">
                                                    <div style={{width: "22%"}} className="progress-bar"></div>
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
        );
    }
}

export default Home;
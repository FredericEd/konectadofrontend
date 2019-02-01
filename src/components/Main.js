import React, { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Stores from "./Screens/Stores";
import Billboards from "./Screens/Billboards";
/*import MobileHeader from "./Layout/MobileHeader";
import Desktopheader from "./Layout/DesktopHeader";
import DashboardMain from "./Dashboard/DashboardMain";
import Footer from "./Layout/Footer";*/
import { BrowserRouter, Switch, Route } from "react-router-dom";
/*import Axios from "axios";
import {
  setExpenses,
  setIncomes,
  getErrors
} from "../actions/transactionActions";*/

class Main extends Component {

  /*componentDidMount() {
    Axios.get("/api/expense/")
      .then(res => {
        this.props.setExpenses(res.data);
      })
      .catch(err => {
        console.log(err);
        this.props.getErrors(err.response.data);
      });

    Axios.get("/api/income/")
      .then(res => {
        this.props.setIncomes(res.data);
      })
      .catch(err => {
        console.log(err);
        this.props.getErrors(err.response.data);
      });
  }*/

  render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <Sidebar />
          <div id="page-wrapper" className="gray-bg">
            <Header childProps={this.props.childProps} />
            <div className="main-content">
            <Switch>
                <Route path="/home" component={() => <h2>Home</h2>} />
                <Route path="/stores" component={Stores} />
                <Route path="/billboards" component={Billboards} />
            </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Main;
/*export default connect(
  null,
  { setExpenses, setIncomes, getErrors }
)(Main);
<BrowserRouter>
        <div className="page-wrapper">
          <MobileHeader />
          <Sidebar />
          <div className="page-container">
            <Desktopheader />
            <div className="main-content">
              <Switch>
                <Route exact path="/" component={DashboardMain} />
                <Route path="/stats" component={StatsMain} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
*/
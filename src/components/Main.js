import React, { Component } from "react";
import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Home from "./Screens/Home";
import Stores from "./Screens/Stores";
import Products from "./Screens/Products";
import Coupons from "./Screens/Coupons";
import Cards from "./Screens/Cards";
import Locales from "./Screens/Locales";
import Billboards from "./Screens/Billboards";
import Members from "./Screens/Members";
import Reportes from "./Screens/Reportes";
import Promos from "./Screens/Promos";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class Main extends Component {

  render() {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <Sidebar />
          <div id="page-wrapper" className="gray-bg">
            <Header childProps={this.props.childProps} />
            <div className="main-content">
            <Switch>
                <Route path="/stores/locales" component={Locales} />
                <Route path="/stores/productos" component={Products} />
                <Route path="/stores/cupones" component={Coupons} />
                <Route path="/stores/cards" component={Cards} />
                <Route path="/stores" component={Stores} />
                <Route path="/billboards" component={Billboards} />
                <Route path="/members" component={Members} />
                <Route path="/reportes" component={Reportes} />
                <Route path="/promos" component={Promos} />
                <Route exact path="/" component={Home} />
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
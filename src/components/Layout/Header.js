import React, {Component} from "react";
import {logout} from '../../actions/authActions';

class Header extends Component {
    state = {
        showOptions: false,
    }
    optionsRef = React.createRef();
    handleLogout = () => {
        this.props.childProps.userHasAuthenticated(false);
    }
    handleOptions = () => this.setState(prevState => ({showOptions: !prevState.showOptions}));
    handleClickOutside = event => {
        //this.optionsRef && !this.optionsRef.current.contains(event.target) && this.setState({showOptions: false});
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        {/*<a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
                        <form role="search" className="navbar-form-custom" action="search_results.html">
                            <div className="form-group">
                                <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                            </div>
                        </form>*/}
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <span className="m-r-sm text-muted welcome-message">Bienvenido a Smart Tótem.</span>
                        </li>
                        {/*<li className={"dropdown " + (this.state.showOptions ? "open" : "")}>
                            <a onClick={this.handleOptions} ref={this.optionsRef} className="dropdown-toggle count-info open" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell"></i>  <span className="label label-primary">8</span>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="mailbox.html">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="profile.html">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                            <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="grid_options.html">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                            <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <div className="text-center link-block">
                                        <a href="notifications.html">
                                            <strong>See All Alerts</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>*/}
                        <li>
                            <a href="#" onClick={() => logout(this.handleLogout)/*
                                handleLogout(props.childProps.userHasAuthenticated)*/}>
                                <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};
export default Header;
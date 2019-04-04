import React from "react";
import Link from "react-router-dom/Link";

export default () => {
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element"> 
                            <span>
                                <img alt="Logo de SmartTotem" className="logo" src={require("../../img/logo.png")} />
                            </span>
                            {/*<a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">David Williams</strong>
                                </span> <span className="text-muted text-xs block">Art Director <b className="caret"></b></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="profile.html">Profile</a></li>
                                <li><a href="contacts.html">Contacts</a></li>
                                <li><a href="mailbox.html">Mailbox</a></li>
                                <li className="divider"></li>
                                <li><a href="login.html">Logout</a></li>
                            </ul>*/}
                        </div>
                    </li>
                    <li className={window.location.pathname === "/" ? "active" : ""}>
                        <Link to="/">
                            <i className="fas fa-tachometer-alt" /> <span className="nav-label">Home</span>
                        </Link>
                    </li>
                    <li className={window.location.pathname === "/stores" ? "active" : ""}>
                        <Link to="/stores">
                            <i className="fas fa-chart-bar" /> <span className="nav-label">Afiliados</span>
                        </Link>
                    </li>
                    <li className={window.location.pathname === "/billboards" ? "active" : ""}>
                        <Link to="/billboards">
                            <i className="fas fa-chart-bar" /> <span className="nav-label">Tótems</span>
                        </Link>
                    </li>
                    <li className={window.location.pathname === "/members" ? "active" : ""}>
                        <Link to="/members">
                            <i className="fas fa-chart-bar" /> <span className="nav-label">Socios</span>
                        </Link>
                    </li>
                    <li className={window.location.pathname === "/reportes" ? "active" : ""}>
                        <Link to="/reportes">
                            <i className="fas fa-chart-bar" /> <span className="nav-label">Reportes</span>
                        </Link>
                    </li>
                    <li className={window.location.pathname === "/promos" ? "active" : ""}>
                        <Link to="/promos">
                            <i className="fas fa-chart-bar" /> <span className="nav-label">Promos</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
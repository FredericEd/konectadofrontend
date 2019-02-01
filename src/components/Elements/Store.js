import React from "react";

export default props => {
    return (
        <div className="col-lg-4">
            <div className="contact-box">
                <a href="#">
                    <div className="col-sm-4">
                        <div className="text-center">
                            <img alt="image" className="img-circle m-t-xs img-responsive" src={require("../../img/a3.jpg")} />
                            <div className="m-t-xs font-bold">Graphics designer</div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <h3><strong>John Smith</strong></h3>
                        <p><i className="fa fa-map-marker"></i> Riviera State 32/106</p>
                        <address>
                            <strong>Twitter, Inc.</strong><br />
                            795 Folsom Ave, Suite 600<br />
                            San Francisco, CA 94107<br />
                            <abbr title="Phone">P:</abbr> (123) 456-7890
                        </address>
                        <div>
                            <button class="btn btn-success sspaced" title="Locales"><i class="fa fa-building"></i></button> 
                            <button class="btn btn-success sspaced" title="Productos"><i class="fa fa-list"></i></button> 
                            <button class="btn btn-success sspaced" title="Cupones"><i class="fa fa-credit-card"></i></button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </a>
            </div>
        </div>
    );
};
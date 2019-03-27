import React from "react";

export default props => {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="contact-box">
                    <div className="col-sm-10 vcenter">
                        <div className="text-center">
                            <img className="m-t-xs img-responsive" style={{display: "inline-block"}} src={`data:image/png;base64,${props.promo.image_file}`} />
                        </div>
                    </div>
                    <div className="col-sm-2 vcenter" style={{padding: "1rem"}}>
                                <button className="btn btn-success sspaced" onClick={() => props.handleDeleteRequest(props.promo._id)} title="Eliminar"><i className="fa fa-ban"></i></button>
                    </div>
                    <div className="clearfix"></div>
            </div>
        </div>
    );
};
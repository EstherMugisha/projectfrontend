import React from "react";

class Total extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let total = this.props.total.toFixed(2);
        let mystyle = {
            borderTop: "1px solid #ddd",
            marginTop: "10px"
        };
        return (
            <div style={{"marginTop": "30px", "backgroundColor": "#F6F6F6", "padding": "10px"}}>
                <h3 className="row" style={mystyle}>
                    <span className="col-6">Total :</span>
                    <span className="col-6 text-right">${total}</span>
                </h3>
            </div>
        );
    }
}

export default Total;
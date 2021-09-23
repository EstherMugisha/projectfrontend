import React, {useContext} from "react";

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 0
        };
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    add() {
        this.setState({
            qty: this.state.qty + 1
        });
        this.props.handleTotal(this.props.price);
    }

    subtract() {
        this.setState({
            qty: this.state.qty - 1
        });
        this.props.handleTotal(-this.props.price);
    }

    showInfo() {
        this.props.handleShow(this.props.info);
    }

    render() {
        return (
            <div>
                <div className="row form-group">
                    <div className="col-sm-10">
                        <h4>{this.props.name}: ${this.props.price}</h4>
                    </div>
                    <div className="col-sm-2 text-right">qty: {this.state.qty}</div>
                </div>
                <div className="row btn-toolbar">
                    <div className="col-6">
                        <button className="btn btn-outline-primary" onClick={this.showInfo}>
                            show info
                        </button>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn btn-outline-primary" onClick={this.add}>
                            +1
                        </button>
                        <button className="btn btn-outline-primary" onClick={this.subtract} disabled={this.state.qty < 1}>
                            -1
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default CartItem;
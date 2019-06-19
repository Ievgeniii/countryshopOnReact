import React, { Component } from 'react';
import * as actionCreators from "../store/index";
import { connect } from "react-redux";
import { FaTrashAlt } from 'react-icons/fa';
import classes from './Cart.module.css';

class Cart extends Component {
    state = {show: false};

    onBuyHandler = () => {
        this.setState({show: true});
    };

    onCloseModalHandler = () => {
        this.setState({show: false});
        this.props.history.push('/');
        this.props.clearCart();
    };

    render() {
        let cart = <h2>Cart is empty for now!</h2>;

        if (this.props.countriesInCart.length > 0) {
            cart = (
                <React.Fragment>
                    {this.props.countriesInCart.map((country, index) => {
                        return(
                            <div key={country.name} className={classes.country}>
                                <div className={classes.info}>
                                    <img src={country.flag} alt={country.name}/>
                                    <h3>{country.name}</h3>
                                    <p>Amount: <span>{country.amount}</span></p>
                                    <p>Current Price: <span>{country.price}</span></p>
                                </div>
                                <div className={classes.buttons}>
                                    <button
                                        disabled={country.amount === 1}
                                        onClick={() => this.props.changeAmount({index: index, action: 'minus'})}>-</button>
                                    <button onClick={() => this.props.changeAmount({index: index, action: 'plus'})}>+</button>
                                    <button onClick={() => this.props.deleteCountry(country)}><FaTrashAlt/></button>
                                </div>
                            </div>
                        )
                    })}
                    <div className={classes.total}>
                        <h1>Total Price: <span>{this.props.totalPrice}</span></h1>
                        <button onClick={this.onBuyHandler}>BUY</button>
                    </div>
                </React.Fragment>
            )
        }

        return(
            <div className={classes.main}>
                {cart}
                <div
                    className={classes.backdrop}
                    style={{display: this.state.show ? 'flex' : 'none'}}
                    onClick={this.onCloseModalHandler}>
                    <div className={classes.modal}>
                        <h1>Thank You!</h1>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countriesInCart: state.cart,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeAmount: (country) => dispatch(actionCreators.changeAmount(country)),
        deleteCountry: (country) => dispatch(actionCreators.deleteCountry(country)),
        clearCart: () => dispatch(actionCreators.clearCart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

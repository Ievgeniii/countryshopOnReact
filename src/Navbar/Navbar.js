import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { FaShoppingCart } from 'react-icons/fa';
import classes from './Navbar.module.css';

const navbar = (props) => {
    return(
        <div className={classes.navbar}>
            <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>
            <NavLink to="/cart" exact activeClassName={classes.active}>
                <FaShoppingCart/>
                <span style={{display: props.amount !== 0 ? 'inline' : 'none'}}>{props.amount}</span>
            </NavLink>
        </div>
    )
};

const mapStateToProps = state => {
    return {amount: state.cart.length};
};

export default connect(mapStateToProps)(navbar);

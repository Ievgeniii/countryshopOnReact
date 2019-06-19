import React from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../store";
import { FaShoppingCart } from 'react-icons/fa';
import classes from './Details.module.css';

const details = (props) => {
    let details = null;

    if (props.country.name) {
        details = (
            <React.Fragment>
                <h1>{props.country.name}</h1>
                <img src={props.country.flag} alt={props.country.name}/><br/>
                <p>Alpha Code (2 letters): <span>{props.country.alpha2Code}</span></p>
                <p>Alpha Code (3 letters): <span>{props.country.alpha3Code}</span></p>
                <p>Capital: <span>{props.country.capital}</span></p>
                <p>Demonym: <span>{props.country.demonym}</span></p>
                <p>Region: <span>{props.country.region}</span></p>
                <p>Subregion: <span>{props.country.subregion}</span></p>
                <p>Price: <span>{props.country.population}</span></p>
                <button onClick={() => props.addToCart(props.country)}>Add To Cart
                    <span><FaShoppingCart/></span>
                </button>
            </React.Fragment>
        );
    }

    return(
        <div className={classes.details}>
            {details}
        </div>
    );
};

const mapStateToProps = state => {
    return {country: state.details};
};

const mapDispatchToProps = dispatch => {
    return {addToCart: (country) => dispatch(actionCreators.addToCart(country))};
};

export default connect(mapStateToProps, mapDispatchToProps)(details);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from "../../store";
import { FaShoppingCart } from 'react-icons/fa';
import classes from './Output.module.css';

const output = (props) => {
    let output = <h2>Please use filter to see available countries!</h2>;

    if (props.countries.length > 0) {
        output = (
            <React.Fragment>
            {props.countries.map(country => {
                return(
                    <div key={country.name} className={classes.result}>
                        <Link to={"/details/" + country.name.toLowerCase()}>
                            <div onClick={() => props.loadDetails(country)}>
                                <img src={country.flag} alt={country.name}/>
                                <h4>{country.name}</h4>
                                <p>Price: <span>{country.population}</span></p>
                            </div>
                        </Link>
                            <button onClick={() => props.addToCart(country)}>Add To Cart
                                <span><FaShoppingCart/></span>
                            </button>
                    </div>
                )
            })}
        </React.Fragment>
        )
    }

    return(
        <div className={classes.results}>
            {output}
        </div>
    )
};

const mapStateToProps = state => {
    return {countries: state.countries};
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (country) => dispatch(actionCreators.addToCart(country)),
        loadDetails: (country) => dispatch(actionCreators.loadDetails(country))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(output);

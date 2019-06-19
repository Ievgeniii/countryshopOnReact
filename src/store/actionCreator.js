import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getCountries = (country) => {
    return dispatch => {
        axios.get('https://restcountries.eu/rest/v2/region/' + country)
            .then(res => {
                console.log(res.data);
                dispatch(getCountriesAsync({data: res.data, country: country}));
            })
    };
};

const getCountriesAsync = (countries) => {
    return {
        type: actionTypes.GET_COUNTRIES,
        value: countries
    }
};

export const addToCart = (country) => {
    return {
        type: actionTypes.ADD_TO_CART,
        value: {...country}
    }
};

export const changeAmount = (country) => {
    return {
        type: actionTypes.CHANGE_AMOUNT,
        value: country
    }
};

export const deleteCountry = (country) => {
    return {
        type: actionTypes.DELETE_COUNTRY,
        value: country
    }
};

export const loadDetails = (country) => {
    return {
        type: actionTypes.LOAD_DETAILS,
        value: country
    }
};

export const sortCountries = (sortingOrder) => {
    return {
        type: actionTypes.SORT_COUNTRIES,
        value: sortingOrder
    }
};

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
};

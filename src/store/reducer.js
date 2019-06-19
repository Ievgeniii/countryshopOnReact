import * as actionTypes from './actionTypes';

const initialState = {
    countries: [],
    checked: {
        africa: false,
        americas: false,
        asia: false,
        europe: false,
        oceania: false
    },
    sortingOrder: '',
    cart: [],
    totalPrice: 0,
    details: {}
};

const reducer = (state = initialState, action) => {

    const sortCountries = (array, sortingOrder) => {
        const arr = [...array];
        switch (sortingOrder) {
            case 'az':
                arr.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                });
                return arr;
            case 'za':
                arr.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0;
                });
                return arr;
            case 'asc':
                arr.sort((a, b) => a.population - b.population);
                return arr;
            case 'desc':
                arr.sort((a, b) => b.population - a.population);
                return arr;
            default: return arr;
        }
    };

    switch (action.type) {

        case actionTypes.GET_COUNTRIES:
            let countries = [...state.countries];
            countries = action.value.data;

            const checked = {...state.checked};
            for (let key in checked) {
                checked[key] = false;
            }
            checked[action.value.country] = true;
            return {
                ...state,
                countries: sortCountries(countries, state.sortingOrder),
                checked: checked
            };

        case actionTypes.ADD_TO_CART:
            const addCountry = (countryToAdd) => {
                let cart = [...state.cart];
                for (let country of cart) {
                    if (country.name === countryToAdd.name) {
                        country.amount += 1;
                        country.price += countryToAdd.population;
                        return cart;
                    }
                }
                countryToAdd.amount = 1;
                countryToAdd.price = countryToAdd.population;
                cart.push(countryToAdd);
                return cart;
            };
            return {
                ...state,
                cart: addCountry(action.value),
                totalPrice: state.totalPrice += action.value.population
            };

        case actionTypes.CHANGE_AMOUNT:
            const cartCountries = [...state.cart];
            let totalPrice = state.totalPrice;
            if (action.value.action === 'plus') {
                cartCountries[action.value.index].amount += 1;
                cartCountries[action.value.index].price += cartCountries[action.value.index].population;
                totalPrice += cartCountries[action.value.index].population;
            } else {
                cartCountries[action.value.index].amount -= 1;
                cartCountries[action.value.index].price -= cartCountries[action.value.index].population;
                totalPrice -= cartCountries[action.value.index].population;
            }
            return {
                ...state,
                cart: cartCountries,
                totalPrice: totalPrice
            };

        case actionTypes.DELETE_COUNTRY:
            const cartAfterDelete = state.cart.filter(result => result.name !== action.value.name);
            return {
                ...state,
                cart: cartAfterDelete,
                totalPrice: state.totalPrice -= action.value.price
            };

        case actionTypes.LOAD_DETAILS:
            return {
                ...state,
                details: action.value
            };

        case actionTypes.SORT_COUNTRIES:
            return {
                ...state,
                countries: sortCountries(state.countries, action.value),
                sortingOrder: action.value
            };

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cart: [],
                totalPrice: 0
            };

        default: return state;
    }
};

export default reducer;

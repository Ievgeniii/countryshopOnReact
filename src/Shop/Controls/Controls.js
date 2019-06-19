import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import classes from './Controls.module.css';

const controls = (props) => {
    return(
        <div className={classes.formholder}>
            <form onChange={(event) => props.getCountries(event.target.value)}>
                <h4>Filter:</h4>
                <label className={classes.container} htmlFor="africa">Africa
                    <input type="radio" id="africa" name="geo" value="africa" defaultChecked={props.checked.africa}/>
                    <span className={classes.checkmark}></span>
                </label>
                <label className={classes.container} htmlFor="americas">Americas
                    <input type="radio" id="americas" name="geo" value="americas" defaultChecked={props.checked.americas}/>
                    <span className={classes.checkmark}></span>
                </label>
                <label className={classes.container} htmlFor="asia">Asia
                    <input type="radio" id="asia" name="geo" value="asia" defaultChecked={props.checked.asia}/>
                    <span className={classes.checkmark}></span>
                </label>
                <label className={classes.container} htmlFor="europe">Europe
                    <input type="radio" id="europe" name="geo" value="europe" defaultChecked={props.checked.europe}/>
                    <span className={classes.checkmark}></span>
                </label>
                <label className={classes.container} htmlFor="oceania">Oceania
                    <input type="radio" id="oceania" name="geo" value="oceania" defaultChecked={props.checked.oceania}/>
                    <span className={classes.checkmark}></span>
                </label>
            </form>
            <div
                className={classes.sort}
                style={{opacity: props.countries.length === 0 ? '0' : '1'}}>
                <h4>Sort By:</h4>
                <select
                    onChange={(event) => props.sortCountries(event.target.value)}
                    disabled={props.countries.length === 0}
                    defaultValue={props.selected}>
                    <option value="az">Name (A-z)</option>
                    <option value="za">Name (Z-a)</option>
                    <option value="asc">Price (Ascending)</option>
                    <option value="desc">Price (Descending)</option>
                </select>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        checked: state.checked,
        selected: state.sortingOrder,
        countries: state.countries
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCountries: (value) => dispatch(actionCreators.getCountries(value)),
        sortCountries: (value) => dispatch(actionCreators.sortCountries(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(controls);

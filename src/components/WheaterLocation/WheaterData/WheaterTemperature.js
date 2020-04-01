import React, { Component } from 'react';
import WeatherIcons from 'react-weathericons';
import PropTypes from 'prop-types';
import {CLOUD,CLOUDY,SUN, SNOW,RAIN,WINDY } from './../../../constants/wheaters';
import './style.css';

const stateIconName = wheaterState => {
    switch (wheaterState) {
        case CLOUD:
                return "cloud";
            
        case CLOUDY:
            return "cloudy";

        case SUN:
            return "day-sunny";

        case RAIN:
            return "rain";
        case SNOW:
            return "snow";

        case WINDY:

            return "windy";
        default:
            return "day-sunny";

    }
}
const WheaterTemperature = ({ temperature, wheaterStyle }) => (
    <div className="wheaterTemperatureCont">
        <WeatherIcons className="wicon" name={stateIconName(wheaterStyle)} size="4x" />
        <span className="temperature">{`${temperature}`}</span>
        <span className="temperatureType">ºC</span>

    </div>
);
WheaterTemperature.propTypes ={
    temperature: PropTypes.number,
    wheaterState: PropTypes.string,
};
export default WheaterTemperature;
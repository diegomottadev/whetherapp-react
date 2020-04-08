import React from 'react';
import WheaterTemperature from './WheaterTemperature';
import WheaterExtraData from './WheaterExtraData';
import './style.css';
import { PropTypes } from 'prop-types';

const WheaterData =({data})=>{
    const {temperature,wheaterState,humidity,wind} = data;
    return (
        <div className="wheaterDataCont">
            <WheaterTemperature temperature={temperature} wheaterStyle={wheaterState}/>
            <WheaterExtraData humidity={humidity} wind={wind}/>
        </div>
    );

 };

 WheaterData.protoTypes = {
     data: PropTypes.shape({
         temperature: PropTypes.number.isRequired,
         wheaterState: PropTypes.string.isRequired,
         humidity: PropTypes.number.isRequired,
         wind: PropTypes.string.isRequired
     })
 }

export default WheaterData;
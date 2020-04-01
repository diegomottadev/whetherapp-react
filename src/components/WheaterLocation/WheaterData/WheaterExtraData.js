import React,{Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import './style.css';

const WheaterExtraData =({humidity,wind})=>(
    <div className="wheaterExtraInfoCont">
        <span className="extraInfoData">{` Humedad ${humidity} %`}</span>
        <span className="extraInfoData">{` Viento ${wind}`}</span>
    </div>
);
WheaterExtraData.propTypes = {
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.string.isRequired
};
export default WheaterExtraData;
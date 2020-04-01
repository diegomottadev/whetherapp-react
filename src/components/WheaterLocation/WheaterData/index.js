import React,{Component} from 'react';
import WheaterTemperature from './WheaterTemperature';
import WheaterExtraData from './WheaterExtraData';
import {CLOUD,CLOUDY} from './../../../constants/wheaters';
import './style.css';

const WheaterData =()=>(
    <div className="wheaterDataCont">
        <WheaterTemperature temperature={20} wheaterStyle={CLOUD}/>
        <WheaterExtraData humidity={80} wind={"10m/s"}/>
    </div>
);

export default WheaterData;
import React,{Component} from 'react';
import Location from './Location';
import WheaterData from './WheaterData';
import './style.css';

const WheaterLocation =()=>(
    <div className="wheaterLocationCont">
        <Location city={'Buenos Aires'}></Location>
        <WheaterData ></WheaterData>
    </div>
);

export default WheaterLocation;
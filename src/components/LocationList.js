import React from 'react';
import WheaterLocation from './WheaterLocation';

const LocationList = ()=>(
        <div>
            <WheaterLocation city={'Buenos Aires,ar'}></WheaterLocation>
            <WheaterLocation city={'Bogota,col'}></WheaterLocation>
        </div>
    );

export default LocationList;
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import './style.css';

const Location =(props)=>{
    const {city} = props //destructurig
    return(
        <div className="locationCont"><h1>{city}</h1></div>
    );
    
}

Location.propTypes ={
    city: PropTypes.string.isRequired
};
export default Location;
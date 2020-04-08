import convert from 'convert-units';
import {  SUN } from './../constants/wheaters';

const  getTemp = kelvin =>{
    return Number(convert(kelvin).from('K').to('C').toFixed(2));
}

const getWheaterState = wheater =>{
    return SUN
}

const transformWheater  = (wheaterData)=>{
     const {humidity,temp} = wheaterData.main;
     const {speed} = wheaterData.wind;
     const wheaterState = getWheaterState();
     const temperature = getTemp(temp);

     const data ={
         humidity,
         temperature: temperature,
         wheaterState, 
         wind: `${speed} m/s `
     } 
     return data;
 }


 export default transformWheater;
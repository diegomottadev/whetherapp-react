import React,{Component} from 'react';
import Location from './Location';
import WheaterData from './WheaterData';
import './style.css';
import { SNOW, SUN } from '../../constants/wheaters';

const data0 ={
    temperature: 20,
    wheaterState: SNOW,
    humidity: 10,
    wind: '10 m/s'
}
const data1 ={
    temperature: 10,
    wheaterState: SUN,
    humidity: 20,
    wind: '210 m/s'
}

class WheaterLocation extends Component{
    constructor(){
        super();
        
        this.state = {
            city:'Buenos Aires',
            data : data1};
    }
    handleUpdateClick=()=>{
        this.setState({data: data0});
    }

    render =()=>

        {
            const {city,data} = this.state;
            return (
                <div className="wheaterLocationCont">
                <Location city={city}></Location>
                <WheaterData data={data}></WheaterData>
                <button onClick={this.handleUpdateClick}>Actualizar</button>
            </div>
            );

        }
}

export default WheaterLocation;
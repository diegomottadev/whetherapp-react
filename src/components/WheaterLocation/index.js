import React,{Component} from 'react';
import Location from './Location';
import WheaterData from './WheaterData';
import './style.css';
import { SNOW, SUN } from '../../constants/wheaters';

const location= 'Buenos Aires,ar';
const api_key = '76c4a06e90c01a93ff185c8dadd7ec13';
const api_wheater = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`
//const api_wheater = 'http://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,ar&appid=76c4a06e90c01a93ff185c8dadd7ec13'
 const data1 ={
    temperature: 20,
    wheaterState: SNOW,
    humidity: 10,
    wind: '10 m/s'
}


class WheaterLocation extends Component{
    constructor(){
        super();
        
        this.state = {
            city:'Buenos Aires',
            data : data1};
    }

   getWheaterState = wheater =>{
       return SUN
   }

    getData = (wheaterData)=>{
        debugger;
        const {humidity,temp} = wheaterData.main;
        const {speed} = wheaterData.wind;
        const wheaterState = this.getWheaterState(this.wheater)

        const data ={
            humidity,
            temperature: temp,
            wheaterState, 
            wind: `${speed} m/s `
        } 
        return data;
    }

    handleUpdateClick=()=>{
        fetch(api_wheater).then(data =>{
            console.log(data)
             return data.json();
         }).then(wheater_data =>{
            console.log(wheater_data);
            const data = this.getData(wheater_data);
            this.setState({data})
         })
        

        //});
        //this.setState({data: data0});
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
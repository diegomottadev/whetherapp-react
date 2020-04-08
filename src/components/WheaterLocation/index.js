import React,{Component} from 'react';
import Location from './Location';
import WheaterData from './WheaterData';
import './style.css';
import transformWheater from '../../services/transformWheater';
import { CircularProgress } from 'material-ui';
import PropTypes from 'prop-types'; // ES6



const api_key = '76c4a06e90c01a93ff185c8dadd7ec13';
const api_url = 'http://api.openweathermap.org/data/2.5/weather';

class WheaterLocation extends Component{
    constructor({city}){
        super();
        this.state = {
            city,
            data : null
        };
    }


    handleUpdateClick=()=>{
        const {city} = this.state;
        
        const api_wheater = `${api_url}?q=${city}&appid=${api_key}`;
        fetch(api_wheater).then(data =>{
            console.log(data)
            return data.json();
         }).then(wheater_data =>{
            console.log(wheater_data);
            const data = transformWheater(wheater_data);
            this.setState({data})
         })
    }

    componentDidMount(){
        this.handleUpdateClick();
    }

    render =()=>

        {
            const {city,data} = this.state;
            return (
                <div className="wheaterLocationCont">
                <Location city={city}></Location>
                {data ? <WheaterData data={data}></WheaterData>: <CircularProgress size={60} thickness={7}></CircularProgress>}
            </div>
            );

        }
}
WheaterLocation.protoTypes ={
    city: PropTypes.string
}
export default WheaterLocation;
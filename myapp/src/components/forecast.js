import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import { BsArrowLeftCircleFill } from "react-icons/bs";

function Forecast() {
    let { cityname } = useParams();
    cityname = cityname.slice(1);
    const [records,setRecords]=useState([]);
    const navigate=useNavigate();
    let ar=[];

    useEffect(()=>{
        const api_key = 'be7377befbf477f1c5143d5791f260be';
        const fetchData=async()=>{
            try{
                const url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&cnt=36&appid=${api_key}`
                const response=await fetch(url);
                const data = await response.json();
                setRecords(data.list);
            } catch(error){
                console.log("Error is: ", error);
            }
        };
        fetchData();
    }, [cityname]);

    function getDayName(dateString) {
        const date = new Date(dateString.split(' ')[0]);
        const dayName = date.toLocaleString('en-us', { weekday: 'long' });
        return dayName;
    }

    function getWeatherIcon(iconCode) {
        const iconMap={
            "01d": clear,"01n": clear,"02d": cloud,"02n": cloud,"03d": cloud,
            "03n": cloud,"04d": cloud,"04n": cloud,"09d": rain,"09n": rain,
            "10d": rain,"10n": rain,"11d": drizzle,"11n": drizzle,"13d": snow,
            "13n": snow,"50d": humidity,"50n": humidity,
        }
        return iconMap[iconCode];
    }
    const today = new Date().toISOString().split('T')[0];
    const todayData = records.filter(day => day.dt_txt.includes(today));

    return (
        <div>
            <div className="container">
                <div className="row" style={{marginTop:'10px'}}>
                    <div className="col-md-2">
                        <button className="btn btn-primary back_btn" onClick={()=>{navigate('/')}}><BsArrowLeftCircleFill /> Back</button>
                    </div>
                    <div className="col-md-10" style={{ textAlign: 'center' }}>
                        <h3>Weather Forecast of {cityname}</h3>
                    </div>
                </div><br></br>

                <div className="row">
                    <div className="col-md-3" style={{backgroundColor:'#dfdff2bd',borderRadius:'25px 0 0 25px'}}>
                        <div className="row">
                            <div className="col-md-12" style={{textAlign:'center'}}>
                                {records.length > 0 && records[0].weather && records[0].weather.length > 0 && (
                                    <img src={getWeatherIcon(records[0].weather[0].icon)} alt="temp_img" />
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" id="place_name">
                                <h2>{cityname}</h2>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'5px',marginBottom:'10px'}}>
                            <div className="col-md-12">
                                <h2>{(todayData.length > 0 && (todayData[0].main.temp - 273.15).toFixed(2)) || 'N/A'}°C</h2><br />
                                <h4 style={{color:'#ac9696', fontSize:'18px'}}>{today}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9" style={{backgroundColor:'#f6f6f8',borderRadius:'0 25px 25px 0'}}>

                        <div className="row weather_cards">
                            {records
                            .filter((day) => {
                                const date = day.dt_txt.split(' ')[0];
                                if (!ar.includes(date)) {
                                    ar.push(date);
                                    return true;
                                }
                                return false;
                            })
                            .map((day, index) => (
                                <div className="col-md-2 cards" key={index}>
                                    <div className="card-title">
                                        <h6>{getDayName(day.dt_txt)}</h6>
                                    </div>
                                    <div className="card-body">
                                        <img src={getWeatherIcon(day.weather[0].icon)} alt="img" style={{ height: '45px', width: '40px' }} />
                                    </div>
                                    <div className="card-text">
                                        <h6>{(day.main.temp-273.15).toFixed(2)}°C</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="row boxes">
                            <div className="col-md-2 box">
                                <h6>Humidity</h6><br></br>
                                <h3>{records.length > 0 && records[0].main && records[0].main.humidity}</h3>
                            </div>
                            <div className="col-md-2 box">
                                <h6>Temp-Max</h6><br></br>
                                <h3>{records.length > 0 && records[0].main && records[0].main.temp_max && ((records[0].main.temp_max)-273.15).toFixed(2)}</h3>
                            </div>
                            <div className="col-md-2 box">
                                <h6>Temp-Min</h6><br></br>
                                <h3>{records.length > 0 && records[0].main && records[0].main.temp_min && ((records[0].main.temp_min)-273.15).toFixed(2)}</h3>
                            </div>
                            <div className="col-md-2 box">
                                <h6>Wind Speed</h6><br></br>
                                <h3>{records.length > 0 && records[0].wind && records[0].wind.speed}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forecast;
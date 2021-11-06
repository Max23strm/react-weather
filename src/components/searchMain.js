import React,{useEffect,useState} from 'react'
import "../components/style.css"
import WeatherDetails from './WeatherDetails';

function SearchMain() {
    const [searchTerm, seSearchTerm]=useState('Cancun');
    const [tempInfo, setTempInfo]=useState({});

    const getWeatherInfo= async ()=>{
        try{
            let url =`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=9bd32898ad03753167ef916bdce83639`
            let res = await fetch(url);
            let data = await res.json();
            const{temp, humidity, pressure}= data.main;
            const {main:weatherType}= data.weather[0];
            const{name}=data;
            const {speed}= data.wind;
            const {country, sunset}=data.sys;

            const myNewWeatherInfo={
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
        }
        catch(error){
            console.log(error);
        }
    }



    useEffect(() => {
        getWeatherInfo()
    },[]);
    
    return (
        <div>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search" 
                        placeholder="Search City"
                        id="search" 
                        value={searchTerm} 
                        onChange={(e)=>seSearchTerm(e.target.value)}/>
                    <button className="searchButton" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <WeatherDetails {...tempInfo}/>
        </div>
    )
}

export default SearchMain

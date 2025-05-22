import React, { useContext } from 'react'
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaWind } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaTemperatureHigh } from 'react-icons/fa6';
import { MdOutlineRemoveRedEye, MdOutlineWaterDrop } from "react-icons/md";
import { IoNavigateOutline } from "react-icons/io5";
import { language } from '../../lang/lang';


import './Right.css'
import AirItem from '../AirItem/AirItem';
import DayItem from '../DayItem/DayItem';
import { LangContext } from '../../context/LangContext';
const Right = ({air, currentWeather, forecast}) => {
  const hourlyForecast = forecast?.list?.slice(0, 8) || [];

  const status = ['Good', 'Moderate', 'Fair', 'Poor', 'Very Poor']
  
  const formatTime = (hours) => {
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}`;
};

  const sunData = {
    sunriseHour: formatTime(new Date(currentWeather?.sys?.sunrise * 1000).getHours()),
    sunriseMinute: new Date(currentWeather?.sys?.sunrise * 1000).getMinutes(),
    sunsetHour: formatTime(new Date(currentWeather?.sys?.sunset * 1000).getHours()),
    sunsetMinute: new Date(currentWeather?.sys?.sunset * 1000).getMinutes(),
  };
  
  const airQuality = {
    humidity: currentWeather?.main.humidity,
    pressure: currentWeather?.main.pressure,
    visibility: currentWeather?.visibility / 1000,
    windSpeed: currentWeather?.wind.speed,
    feelsLike: currentWeather?.main.feels_like,
  }
  
  const {lang} = useContext(LangContext)
  
  return (
    <div className="sidebar__highlights">
        <h2 className="sidebar__highlights-title">{language[lang].right.title}</h2>
        <div className="highlights-box">
        <div className="sidebar__highlight-item">
          <div className="box">
          <h3 className="title air">{language[lang].right.air}</h3>
          <span className={`${'sidebar__highlight-status'}  ${status[(air?.list[0].main.aqi) - 1]?.slice(0 ,4).toLowerCase()}`}>{language[lang].index[status[(air?.list[0].main.aqi) -1]]}</span>
          </div>
          <ul className="sidebar__highlight-details">
              <FaWind className="wind" />
              <AirItem airData={air?.list[0].components.pm2_5} airType={'PM2.5'}/>
              <AirItem airData={air?.list[0].components.pm10} airType={'PM10'}/>
              <AirItem airData={air?.list[0].components.so2} airType={'SO2'}/>
              <AirItem airData={air?.list[0].components.co} airType={'CO'}/>
              <AirItem airData={air?.list[0].components.no} airType={'NO'}/>
              <AirItem airData={air?.list[0].components.no2} airType={'NO2'}/>
              <AirItem airData={air?.list[0].components.nh3} airType={'NH3'}/>
              <AirItem airData={air?.list[0].components.o3} airType={'O3'}/>
          </ul>
        </div>

        <div className="sidebar__sun-info">
          <h2 className="title sunrise">{language[lang].right.sun}</h2>
          <ul className="list">
            <li>
              <FiSunrise className="wind" />
              <div>
                <p className="title sun-text">{language[lang].right.sunrise}</p>
                <h1 className='sun-title'>{sunData?.sunriseHour}:{sunData?.sunriseMinute} AM</h1>
              </div>
            </li>
            <li className='sunset'>
              <FiSunset className="wind" />
              <div>
                <p className="title sun-text">{language[lang].right.sunset}</p>
                <h1 className='sun-title'>{sunData?.sunsetHour}:{sunData?.sunsetMinute} PM</h1>
              </div>
            </li>
          </ul>
        </div>
        </div>

        <div className="sidebar__extra">
          <ul className="sidebar__extra-list">
            <li className="item">
              <h3 className="title">{language[lang].right.humidity}</h3>
              <div className="drop-box">
                <MdOutlineWaterDrop className="drop" />
                <h1 className='drop-title'>{airQuality.humidity}%</h1>
              </div>
            </li>
            <li className="item">
              <h3 className="title">{language[lang].right.pressure}</h3>
              <div className="drop-box">
                <FaRegCompass className="drop" />
                <h1 className='drop-title'>{airQuality.pressure}hPa</h1>
              </div>
            </li>
            <li className="item">
              <h3 className="title">{language[lang].right.visibility}</h3>
              <div className="drop-box">
                <MdOutlineRemoveRedEye className="drop" />
                <h1 className='drop-title'>{airQuality.visibility} km</h1>
              </div>
            </li>
            <li className="item">
              <h3 className="title">{language[lang].right.wind}</h3>
              <div className="drop-box">
                <IoNavigateOutline className="drop" />
                <h1 className='drop-title'>{airQuality.windSpeed} m/s</h1>
              </div>
            </li>
            <li className="item">
              <h3 className="title">{language[lang].right.feels}</h3>
              <div className="drop-box">
                <FaTemperatureHigh className="drop" />
                <h1 className='drop-title'>{airQuality.feelsLike} &deg;C</h1>
              </div>
            </li>
          </ul>
        </div>

        <div className="sidebar__hourly">
          <h2>{language[lang].right.today}</h2>
          <ul>
    <DayItem data={hourlyForecast[0]} />  
    <DayItem data={hourlyForecast[1]} />
    <DayItem data={hourlyForecast[2]} />
    <DayItem data={hourlyForecast[3]} />
    <DayItem data={hourlyForecast[4]} />
    <DayItem data={hourlyForecast[5]} />
    <DayItem data={hourlyForecast[6]} />
    <DayItem data={hourlyForecast[7]} />
          </ul>
        </div>
      </div>
  )
}

export default Right
import React, { useContext } from 'react';
import { language } from '../../lang/lang';
import { LangContext } from '../../context/LangContext';

const DayItem = ({data}) => {
    const { lang } = useContext(LangContext);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const formatTime = (hours) => {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours} ${ampm}`;
    };

    const dayData = {
        day: new Date(data?.dt * 1000).getDate(),
        month: monthNames[(new Date(data?.dt*1000)).getMonth()],
        date: formatTime(new Date(data?.dt * 1000).getHours()),
        icon: `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`,
        temp: data?.main.temp,
    };

    return (
        <li>
            <span className='dayDate'>{dayData?.day} {language[lang].month[dayData.month]?.slice(0, 3)}</span>
            <h3>{dayData?.date}</h3>
            <img
                src={dayData?.icon}
                alt="Hourly Weather"
            />
            <h3>{dayData?.temp}&deg;C</h3>
        </li>
    );
};

export default DayItem;

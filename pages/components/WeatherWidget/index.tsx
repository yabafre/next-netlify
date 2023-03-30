import { FC, useEffect, useState } from 'react';
import $ from 'jquery';


const WeatherWidget: FC = () => {
    const [time, setTime] = useState('');
    const [temperature, setTemperature] = useState(0);
    let [description, setDescription] = useState('');

    useEffect(() => {

        async function getTime() {
            const date = new Date();
            const options = { timeZone: 'Europe/Paris', hour12: false };
            setTime(date.toLocaleTimeString('fr-FR', options));
        }

        async function getWeatherData() {
            const API_KEY = "1ac3d5e78a389a710094d95fc304e84e";
            const city = 'Paris';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            try {
                const response = await fetch(url);
                console.log(response)
                const datas = await response.json();
                const temperature = Math.round(datas.main.temp);
                let data = datas.weather[0].description;
                // translate description
                if (data === 'clear sky') {
                    setDescription('ciel dégagé');
                } else if (data === 'few clouds') {
                    setDescription('quelques nuages');
                } else if (data === 'scattered clouds') {
                    setDescription('nuages épais');
                } else if (data === 'broken clouds') {
                    setDescription('nuages brisés');
                } else if (data === 'shower rain') {
                    setDescription('jet de pluie');
                } else if (data === 'rain') {
                    setDescription('pluie');
                } else if (data === 'thunderstorm') {
                    setDescription('orage');
                } else if (data === 'snow') {
                    setDescription('neige');
                } else if (data === 'mist') {
                    setDescription('brume');
                } else if (data === 'overcast clouds') {
                    setDescription('nuages couverts');
                } else if (data === 'light rain') {
                    setDescription('pluie légère');
                } else if (data === 'moderate rain') {
                    setDescription('pluie modérée');
                } else {
                    setDescription(data);
                }
                setTemperature(temperature);
            } catch (error) {
                console.error(error);
            }
        }
        getWeatherData().then(r => r);

        setInterval(() => {
            getTime().then(r => r);
        }, 1000);

        setInterval(() => {
            getWeatherData().then(r => r);
        }, 1000 * 60 * 10);
    }, []);

    return (
        <div className="skills-weather flex items-center">
            <span className="icon__loop"></span>
            <div className="form__weather-widget parent-contain">
                <span className="weather-widget coint-1"></span>
                <span className="weather-widget coint-2"></span>
                <span className="weather-widget coint-3"></span>
                <span className="weather-widget coint-4"></span>
                <div className="flex flex-row gap-2.5">
                    <h5 className="weather-widget__time">{time}</h5>
                    <h5 className="weather-widget__temp">{temperature}°C</h5>
                    <h5 className="weather-widget__description">{description}</h5>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;

import React, { Component } from 'react';

import WeatherIcon from './components/WeatherIcon';
import WeatherDetails from './components/WeatherDetails';

import './App.css';

class App extends Component {

    state = {
        time: 1,
        city: '',
        temperature: '',
        weatherCode: '',
        fetching: true
    };

    componentDidMount() {
        this.fetchIP();
    };

    fetchWeatherData = city => {
        const baseUrl = `http://api.openweathermap.org`;
        const path = `/data/2.5/weather`;
        const appId = `aad6422fe07a0f42b3b78ea97380a43f`;
        const query = `units=metric&lang=ru&appid=${appId}`;

        fetch(`${baseUrl}${path}?q=${city}&${query}`)
            .then(response => response.json())
            .then(data => {
                const date = new Date();
                const time = date.getHours();

                this.setState({
                    time: time,
                    city: city,
                    temperature: Math.round(data.main.temp),
                    weatherCode: data.weather[0].id,
                    fetching: false
                });
                console.log(this.state.weatherCode);
            })
            .catch(error => console.error(error));
    };

    fetchIP = () => {
        fetch('//freegeoip.net/json/')
            .then(response => response.json())
            .then(({ city }) => this.fetchWeatherData(city))
            .catch(error => console.log(error));
    };

    render() {
        const { fetching, time, city, temperature, weatherCode } = this.state;

        return fetching ?
            <div className="app">Загрузка...</div>
            :
            <div className="app" data-hour={time}>
                <WeatherIcon
                    weatherCode={weatherCode}
                    time={time} />
                <WeatherDetails
                    city={city}
                    temperature={temperature} />
            </div>;
    };

}

export default App;

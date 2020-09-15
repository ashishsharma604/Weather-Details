import React from 'react';
import WeatherInfo from './components/WeatherInfo'
import WeatherConnector from './components/WeatherConnector'
import {APP_KEY} from './constants'
import backImg from './images/weather1.jpg'
import './App.css';

function App() {
  return (
    <div className="App" style={{backgroundImage : `url(${backImg})`}}>
      <WeatherConnector APP_KEY={APP_KEY}/>
    </div>
  );
}

export default App;

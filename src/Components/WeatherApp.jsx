/** @format */

import React, { useState } from "react";
import "./WeatherApp.css";
import searchpng from "../Assests/searchpng.jpg";
import clearsun from "../Assests/clearsun.png";
import cloudpngsun from "../Assests/cloudpngsun.jpg";
import drizzlepng from "../Assests/drizzlepngsun.png";
import rainpng from "../Assests/rainpng.png";
import snoweather from "../Assests/snoweather.png";
import windpng from "../Assests/windpng.png";
import humidity from "../Assests/humiditypng.jpg";
import { wait } from "@testing-library/user-event/dist/utils";

export default function WeatherApp() {
  let api_key = "b95a56e486e0d1e1bdbedc66ff821162";
  const [wicon, setWicon] = useState(cloudpngsun);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h ";
    temprature[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clearsun);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudpngsun);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzlepng);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzlepng);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rainpng);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rainpng);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snoweather);
    } else {
      setWicon(clearsun);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon">
          <img
            className="srch-icon"
            src={searchpng}
            alt=""
            onClick={() => {
              search();
            }}
          />
        </div>
      </div>
      <div className="weather-image">
        <img className="cloudsun1" src={wicon} alt="" />
      </div>
      <div className="weather-temp"> 24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windpng} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

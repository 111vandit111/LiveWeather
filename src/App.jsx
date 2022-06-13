import React, { useState } from "react";
const api = {
  key: "7112702f75808838c10b36843c15c093",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "january",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Noveber",
      "December",
    ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Satday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 15
            ? `app ${weather.weather[0].main} warm`
            : `app ${weather.weather[0].main} cold`
          : "app notfound"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here ..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name} ,{weather.sys.country}
                </div>
                <div className="date"> {dateBuilder(new Date())}</div>
              </div>
              <div className="weatherbox">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather"> {weather.weather[0].main} </div>
                <div className="temp others">
                  <div>
                    Feels Like : {Math.round(weather.main.feels_like)}°c{" "}
                  </div>
                  <div>
                    {" "}
                    ↓ Min : {Math.round(weather.main.temp_min)}°c
                    &nbsp;&nbsp;&nbsp;&nbsp; ↑ Max :{" "}
                    {Math.round(weather.main.temp_max)}°c{" "}
                  </div>
                  <div> ↗ Wind Speed: {weather.wind.speed}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="weatherbox">
            {weather.message
            ?( <div className="weather"> 404 <br />{weather.message} </div>) : (<div className="weather"> ↑  Enter The Name Of The Place You Want To Search </div>) }
              
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

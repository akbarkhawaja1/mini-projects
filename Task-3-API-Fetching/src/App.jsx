import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function App() {
  const [weatherData, setWeatherData] =  useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('Los Angeles')

  const fetchWeatherData = async () =>{
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3f512426d03e269b5999b6dcae6375aa&units=imperial`)
      setWeatherData(response.data.list)
      setLoading(false)
    }
    catch(error){
      console.error('API call error:', error)

      if(error.response){
        if(error.response.status === 400) {
          setError('No city entered. Please go back and try again.')
        }
        else if(error.response.status === 404) {
          setError('City not found. Please go back and try again.')
        }
        else {
          setError(`Server Error: ${error.response.status} - ${error.response.data.message}`)
        }
      }
      else if (error.request) {
        setError('Network Error: Please check your connection.')
      }
      else {
        setError('Unexpected Error.')
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  },[])

  const handleRetry = () => {
    setError(null)
    setCity('Los Angeles')
  }

  const handleSearch = () => {
    setLoading(true)
    setError(null)
    fetchWeatherData()
  }

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  if(loading) {
      return (
        <div className="App">
          <header className='header'>
            <h1>Task 3: Weather App</h1>
            <span>Powered by OpenWeatherMap</span>
          </header>
          <div className='loading' >
            <ClipLoader color='#a2cfee' size={50} />
          </div>
        </div>
      )
    } 
    
    if(error) {
      return (
        <div className="App">
          <header className='header'>
            <h1>Task 3: Weather App</h1>
            <span>Powered by OpenWeatherMap</span>
          </header>
          <div className='error-div'>
            <p>{error}</p>
            <button onClick={handleRetry} className='error-button'>
              Back
            </button>
          </div>
        </div>
      )
    } 

  return (
    <div className="App">
      <header className='header'>
        <h1>Task 3: Weather App</h1>
        <span>Powered by OpenWeatherMap</span>
      </header>      
      <div className='table-container'>
        <h2>One search, all the weather details you need.</h2>
          <div className='search-container'>
            <input
              type='text'
              value={city}
              placeholder='Search By City...'
              className='search-input'
              onChange={handleChange}
            />
            <button className='search-button' onClick={handleSearch}>
              Search
            </button>
          </div>
        <table className='weather-table'>
          <thead>
            <tr >
              <th>Date</th>
              <th>Temperature (°F)</th>
              <th>Feels Like (°F)</th>
              <th>Humidity (%)</th>
              <th>Weather</th>
              <th>Wind Speed (m/s)</th> 
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data) => (
              <tr key={data.dt}>
                <td>{data.dt_txt.split(' ')[0]}</td>
                <td>{data.main.temp}</td>
                <td>{data.main.feels_like}</td>
                <td>{data.main.humidity}</td>
                <td>{data.weather[0].main}</td>
                <td>{data.wind.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

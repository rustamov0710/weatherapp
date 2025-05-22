import { useEffect, useState, useRef, useContext } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import SideBar from '../../components/Sidebar/Sidebar'
import axios from 'axios'
import { LangContext } from '../../context/LangContext'
import { language } from '../../lang/lang'

const Home = () => {
  const { lang } = useContext(LangContext)
  const [currentWeather, setCurrentWeather] = useState(null)
  const inputRef = useRef()
  const [forecast, setForecast] = useState(null)
  const [location, setLocation] = useState({ lat: null, lon: null })
  const [error, setError] = useState(null)
  const [air, setAir] = useState(null)

  const API = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
  })
  const API_KEY = 'a0397a8aa6e8887e69e641f3b7f23484'

  const city_name = 'tashkent'

  useEffect(() => {
    API.get(`/weather?q=${city_name}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        setCurrentWeather(res.data)
        setError(null)
      })
      .catch(() => setError(language[lang].error.loadingData))

    API.get(`/forecast?q=${city_name}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        setForecast(res.data)
        setError(null)
      })
      .catch(() => setError(language[lang].error.loadingData))
  }, [lang])

  useEffect(() => {
    if (location.lat && location.lon) {
      API.get(`/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`)
        .then((res) => {
          setCurrentWeather(res.data)
          setError(null)
        })
        .catch(() => setError(language[lang].error.fetchingWeather))

      API.get(`/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`)
        .then((res) => {
          setForecast(res.data)
          setError(null)
        })
        .catch(() => setError(language[lang].error.fetchingForecast))

      API.get(`/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`)
        .then((res) => setAir(res.data))
        .catch(() => setError(language[lang].error.fetchingAirPollution))
    }
  }, [location, lang])

  const fetchData = () => {
    const city = inputRef.current.value.trim()

    if (!city) {
      setError(language[lang].error.enterCity)
      return
    }

    API.get(`/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        setCurrentWeather(res.data)
        setError(null)
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError(language[lang].error.cityNotFound)
        } else {
          setError(language[lang].error.loadingData)
        }
        setCurrentWeather(null)
        setForecast(null)
        setAir(null)
      })

    API.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        setForecast(res.data)
        setError(null)
      })
      .catch(() => setForecast(null))
  }

  useEffect(() => {
    if (currentWeather?.coord) {
      API.get(
        `air_pollution?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${API_KEY}`
      )
        .then((res) => setAir(res.data))
        .catch(() => setError(language[lang].error.fetchingAirPollution))
    }
  }, [currentWeather, lang])

  return (
    <div className="wrapper">
      <Header fetchData={fetchData} inputRef={inputRef} setLocation={setLocation} />
      {error ? (
        <div className="error-message">
          <div className="container">
            <div className="error-message__inner">
              <p className="error">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <SideBar air={air} currentWeather={currentWeather} forecast={forecast} />
      )}
    </div>
  )
}

export default Home

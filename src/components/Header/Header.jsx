import { useContext } from "react";
import { GoSearch } from "react-icons/go";
import { BiCurrentLocation } from "react-icons/bi";
import "./Header.css";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function Header({ fetchData, inputRef, setLocation, setError }) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);

  const handleClick = () => {
    localStorage.setItem("isDarkTheme", isDark);
    setIsDark((p) => !p);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude,
          lon: longitude,
        });
        setError(null);
      },
      (error) => {
        setError("Unable to fetch location. Please check your network connection.");
      }
    );
  };

  const hanldeInput = () => {
    console.log(inputRef.current.value);
  };

  // Formani submit qilishda ishlaydi
  const onSubmitHandler = (e) => {
    e.preventDefault(); // sahifani qayta yuklanishini oldini oladi
    fetchData(); // qidiruvni ishga tushiradi
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__inner">
          <h2 className="header__inner-logo">Weather</h2>
          <div className="header__inner-box">
            <div className="header-box">
              <div className="l-d">
                <label className="switch">
                  <input type="checkbox" checked={!isDark} onChange={handleClick} />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="custom-select">
                <select id="select" onChange={(evt) => setLang(evt.target.value)}>
                  <option value="en">en</option>
                  <option value="uz" selected={lang === "uz"}>
                    uz
                  </option>
                  <option value="ru" selected={lang === "ru"}>
                    ru
                  </option>
                </select>
              </div>
            </div>

            {/* input va qidiruv tugmasi formaga o‘ralgan */}
            <form onSubmit={onSubmitHandler} className="search-form">
              <input
                ref={inputRef}
                onChange={hanldeInput}
                className="header__inner-box-input"
                type="search"
                placeholder={language[lang].header.input}
              />
              <button type="submit" className="header__inner-box-button-search">
                <GoSearch /> <p>{language[lang].header.search}</p>
              </button>
            </form>

            <button onClick={getCurrentLocation} className="header__inner-box-button-location">
              <BiCurrentLocation /> <p>{language[lang].header.location}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

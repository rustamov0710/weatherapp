import { useContext } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { ThemeContext } from "./context/ThemeContext";

function App() {
    const {isDark} = useContext(ThemeContext)
    return (
        <div className={`${isDark ? 'dark' : 'light'}`}>
            <Home/>
        </div>
    );
}

export default App;

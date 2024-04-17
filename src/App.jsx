import "./App.css";
import Homepage from "./pages/homepage";
import ThemeButton from "./component/theme-button";
import { useState, createContext } from "react";

//create the context
export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? {backgroundColor: "#feb300"} : {}}>
        {/* <ToggleTheme /> */}
        <ThemeButton />
        <Homepage />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

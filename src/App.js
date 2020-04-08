import React from 'react';
import './App.css';
import LocationList from "./components/LocationList";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function App() {
  return (
    <MuiThemeProvider>
    <div className="App">
      <header className="App-header">
        <LocationList></LocationList>
      </header>
    </div>
    </MuiThemeProvider>
  );
}

export default App;

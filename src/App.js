
import './App.css';
import React, { useState } from "react"

import SearchBar from './searchBar';
import EventList from "./EventList"

function App() {

  const [city, setCity] = useState("melbourne")
  return (
    <div className="App">


      <SearchBar onSubmit={(props) => {
        setCity(props)
      }} />

      <EventList city={city} />
    </div>
  );
}

export default App;

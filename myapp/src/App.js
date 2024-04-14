import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Citiestable from './components/citiestable';
import Forecast from './components/forecast';

function App() {
  return(
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Citiestable />} />
        {/* <Route path="/Forecast/" element={<Forecast />} /> */}
        {/* <Route path="/Forecast/:cityName" render={(props) => <Forecast cityName={props.match.params.cityName} />} /> */}
        <Route path="/forecast/:cityname" element={<Forecast />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;

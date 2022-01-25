import React, {useEffect, useState} from 'react';
import './App.scss';
import Slider from "./components/Slider/Slider";
import axios from "axios";
import {SliderData} from "./utils/SliderData";

function App() {
  const [sliderData, setSliderData] = useState<SliderData[]>([])

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get('https://jsonplaceholder.typicode.com/photos')
      const size = 6
      setSliderData(result.data.slice(0, size))
    }

    getData();
  }, [])

  return <Slider slides={sliderData} />;
}

export default App;

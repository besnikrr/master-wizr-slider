import React, { useState } from 'react';
import './Slider.scss'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import { SliderData } from "../../utils/SliderData";
import { useSwipeable } from "react-swipeable";

const Slider = (props: { slides: SliderData[] }) => {
    const [current, setCurrent] = useState(0);
    const length = props.slides?.length;
    const handlers = useSwipeable({
      onSwipedLeft: () => current !== 5 ? setCurrent(current + 1) : setCurrent(current),
      onSwipedRight: () => current !== 0 ? setCurrent(current - 1) : setCurrent(current),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray( props.slides) ||  props.slides.length <= 0) {
      return null;
    }

    return (
        <div className='content'>
          <h1 className='title'>MASTER WiZR Modules</h1>
          <div className="nav">
            {props.slides?.map((slide: SliderData, index: number) => (
                <div
                  className={index === current ? 'item active' : 'item'}
                  key={index}
                  onClick={() => {setCurrent(index)}}
                >
                  <img src={slide.thumbnailUrl} alt={slide.title} className={index === current ? 'image-small hover' : 'image-small'} />
                  <p>{slide.title.split(' ')[0]}</p>
                </div>
            ))}
          </div>
          <div className='carousel swiper-wrapper' {...handlers}>
            <FaArrowCircleLeft className='left-arrow' onClick={prevSlide} />
            {props.slides?.map((slide: SliderData, index: number) => (
                <div
                  className={index === current ? 'swiper-slide slide active' : 'swiper-slide slide'}
                  key={index}
                  onTouchStart={() => {
                      setCurrent(index)
                  }}
                >
                  {index === current && (
                    <img src={slide.url} alt={slide.title} className='image' />
                  )}
                </div>
            ))}
            <FaArrowCircleRight className='right-arrow' onClick={nextSlide} />
          </div>
        </div>
    );
};

export default Slider;
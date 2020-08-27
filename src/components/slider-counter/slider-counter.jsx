import React from "react";
import PropTypes from "prop-types";
import {PAGE_HEIGHT, SLIDES_COUNT} from "../../const";

const SliderCounter = ({currentSlide}) => {
  return (
    <ul className="slider-counter" style={{top: `${currentSlide * PAGE_HEIGHT + 350}px`}}>
      {[...Array(SLIDES_COUNT)].map((slide, index) => {
        return (
          <li className="slider-counter__item" key={index}>
            <button className={`slider-counter__btn ${currentSlide === index && `slider-counter__btn--active`}`} type="button" aria-label="Выбрать слайд">
              Слайд №1
            </button>
          </li>
        );
      })}

    </ul>
  );
};

SliderCounter.propTypes = {
  currentSlide: PropTypes.number.isRequired,
};

export default SliderCounter;

import React from "react";
import Decision from "../decision/decision.jsx";
import Stages from "../stages/stages.jsx";
import Targets from "../targets/targets.jsx";
import ScrollButton from "../scroll-button/scroll-button.jsx";
import {PAGE_HEIGHT} from "../../const";
import SliderCounter from "../slider-counter/slider-counter.jsx";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      scrollPos: 0,
      isScrolling: true,
      transitionStart: false,
    };

    this.touchStartY = null;
    this.touchEndY = null;

    this.handleScroll = this.handleScroll.bind(this);
    this.scroll = this.scroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener(`wheel`, this.handleScroll);
    window.addEventListener(`touchstart`, (evt) => {
      this.touchStartY = evt.targetTouches[0].clientY;
    });

    window.addEventListener(`touchend`, (evt) => {
      this.touchEndY = evt.changedTouches[0].clientY;
      this.handleTouch();
    });
  }

  componentWillUnmount() {
    window.removeEventListener(`wheel`, this.handleScroll);
  }

  handleTouch() {
    let direction = this.touchStartY - this.touchEndY;
    if (Math.abs(direction) > 100) {
      this.updatePosition(direction);
    }
  }

  handleScroll(evt) {
    let direction = evt.deltaY;
    this.updatePosition(direction);
  }

  updatePosition(direction) {
    const {currentSlide, isScrolling} = this.state;
    if (isScrolling) {
      if (direction < 0) {
        if (currentSlide !== 0) {
          this.scroll(currentSlide - 1);
        }
      } else if (direction > 0) {
        if (currentSlide !== 2) {
          this.scroll(currentSlide + 1);
        }
      }
    }
  }

  scroll(currentSlide) {
    const shift = PAGE_HEIGHT * currentSlide;
    const container = document.querySelector(`.main__container`);
    container.style.transform = `translateY(-${shift}px)`;
    setTimeout(() => this.setState(() => ({
      isScrolling: true,
    })), 1000);
    this.setState((prevState) => ({
      currentSlide,
      isScrolling: !prevState.isScrolling,
    }));
  }

  handleClick() {
    const {currentSlide} = this.state;
    this.scroll(currentSlide + 1);
  }

  render() {
    const {currentSlide, isScrolling} = this.state;

    return (
      <div className="main__container">
        <Targets>
          <ScrollButton handleClick={this.handleClick} visibility={isScrolling}/>
        </Targets>
        <Decision>
          <ScrollButton handleClick={this.handleClick} visibility={isScrolling}/>
        </Decision>
        <Stages/>
        <SliderCounter currentSlide={currentSlide}/>
      </div>
    );
  }
}

export default Main;

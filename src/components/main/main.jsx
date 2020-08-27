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

    this.handleScroll = this.handleScroll.bind(this);
    this.scroll = this.scroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener(`wheel`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`wheel`, this.handleScroll);
  }

  handleScroll(evt) {
    const {currentSlide, isScrolling} = this.state;
    let direction = evt.deltaY;
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
    } else {
      window.scrollTo({
        top: PAGE_HEIGHT * currentSlide,
        behavior: `smooth`
      });
      setTimeout(() => this.setState(() => ({
        isScrolling: true,
      })), 1000);
    }
  }

  scroll(currentSlide) {
    window.scrollTo({
      top: PAGE_HEIGHT * currentSlide,
      behavior: `smooth`
    });
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
      <React.Fragment>
        <Targets>
          <ScrollButton handleClick={this.handleClick} visibility={isScrolling}/>
        </Targets>
        <Decision>
          <ScrollButton handleClick={this.handleClick} visibility={isScrolling}/>
        </Decision>
        <Stages/>
        <SliderCounter currentSlide={currentSlide}/>
      </React.Fragment>
    );
  }
}

export default Main;

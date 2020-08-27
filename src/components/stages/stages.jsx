import React from "react";
import {PAGE_WIDTH, BAR_WIDTH, MARKER_WIDTH} from "../../const";

const getCoordsX = (evt) => {
  const windowWidth = document.documentElement.clientWidth;

  if (windowWidth > PAGE_WIDTH) {
    return Math.floor(evt.clientX - (PAGE_WIDTH - BAR_WIDTH + MARKER_WIDTH + windowWidth - PAGE_WIDTH) / 2);
  } else {
    return Math.floor(evt.clientX - (PAGE_WIDTH - BAR_WIDTH + MARKER_WIDTH) / 2);
  }
};

class Stages extends React.PureComponent {
  constructor(props) {
    super(props);

    this.dot = null;
    this.range = null;
    this.bar = null;
    this.handleDrag = this.handleDrag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    this.dot = document.querySelector(`.range__dot`);
    this.range = document.querySelector(`.range__container`);
    this.bar = document.querySelector(`.range__progress`);

    this.dot.addEventListener(`mousedown`, (e) => {
      e.stopPropagation();
      this.range.addEventListener(`mousemove`, this.handleDrag);
    });

    window.addEventListener(`mouseup`, this.handleMouseUp);
  }

  handleDrag(evt) {
    const coordsX = getCoordsX(evt);
    if (coordsX < -MARKER_WIDTH / 2) {
      this.dot.style.left = -MARKER_WIDTH / 2 + `px`;
      this.bar.style.width = `0px`;
    } else if (coordsX > BAR_WIDTH - MARKER_WIDTH / 2) {
      this.dot.style.left = BAR_WIDTH - MARKER_WIDTH / 2 + `px`;
      this.bar.style.width = BAR_WIDTH + `px`;
    } else {
      requestAnimationFrame(() => {
        this.dot.style.left = coordsX + `px`;
        this.bar.style.width = coordsX + MARKER_WIDTH / 2 + `px`;
      });
    }
  }

  handleMouseUp(evt) {
    this.range.removeEventListener(`mousemove`, this.handleDrag);

    const coordsX = getCoordsX(evt);
    if (coordsX >= -MARKER_WIDTH / 2 && coordsX <= BAR_WIDTH * 0.25) {
      this.setState(() => ({
        value: 0,
      }));
      this.dot.style.left = -MARKER_WIDTH / 2 + `px`;
      this.bar.style.width = `0px`;
      this.handleChange();
    } else if (coordsX >= BAR_WIDTH * 0.75 && coordsX <= BAR_WIDTH + MARKER_WIDTH / 2) {
      this.setState(() => ({
        value: 2,
      }));
      this.dot.style.left = BAR_WIDTH - MARKER_WIDTH / 2 + `px`;
      this.bar.style.width = BAR_WIDTH + `px`;
      this.handleChange();
    } else {
      this.setState(() => ({
        value: 1,
      }));
      this.dot.style.left = BAR_WIDTH / 2 - MARKER_WIDTH / 2 + `px`;
      this.bar.style.width = BAR_WIDTH / 2 + `px`;
      this.handleChange();
    }
  }

  handleChange() {
    const shift = PAGE_WIDTH * this.state.value;
    const cards = document.querySelector(`.stages__list`);
    cards.style.transform = `translateX(-${shift}px)`;
  }

  render() {
    return (
      <section className="stages">
        <h2 className="visually-hidden">Этапы изучения патогенеза</h2>
        <ul className="stages__list">
          <li className="stages__item">Звенья патогенеза СД2</li>
          <li className="stages__item">Смертельный октет</li>
          <li className="stages__item">Звенья патогенеза СД2</li>
        </ul>
        <div className="range__container">
          <div className="range__dot"/>
          <div className="range__bar"/>
          <div className="range__progress"/>
          <ul className="range__labels">
            <li>1988</li>
            <li>2009</li>
            <li>2016</li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Stages;

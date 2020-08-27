import React from "react";
import PropTypes from "prop-types";

const Targets = (props) => {
  return (
    <section className="targets container">
      <h2 className="targets__title">Всегда ли цели терапии СД2 на поверхности?</h2>
      <ul className="targets__list">
        <li className="targets__item">Цель по HbA1c
          <span className="targets__item-marker targets__item-marker--big"/>
        </li>
        <li className="targets__item">Гипогликемия
          <span className="targets__item-marker"/>
        </li>
        <li className="targets__item">Осложнения СД
          <span className="targets__item-marker targets__item-marker--small"/>
        </li>
        <li className="targets__item">СС риски
          <span className="targets__item-marker targets__item-marker--small"/>
        </li>
      </ul>
      {props.children}
    </section>
  );
};

Targets.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Targets;

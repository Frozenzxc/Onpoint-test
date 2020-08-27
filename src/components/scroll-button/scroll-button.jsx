import React from "react";
import PropTypes from "prop-types";

const ScrollButton = ({handleClick, visibility}) => {
  return (
    <button className={`targets__btn ${!visibility && `targets__btn--hide`}`} onClick={handleClick}>Листайте вниз</button>
  );
};

ScrollButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default ScrollButton;

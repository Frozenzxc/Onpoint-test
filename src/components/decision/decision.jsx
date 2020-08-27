import React from "react";
import PropTypes from "prop-types";

const Decision = (props) => {
  return (
    <section className="decision container">
      <h2 className="decision__title">Основа терапии - патогенез СД2</h2>
      {props.children}
    </section>
  );
};

Decision.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Decision;

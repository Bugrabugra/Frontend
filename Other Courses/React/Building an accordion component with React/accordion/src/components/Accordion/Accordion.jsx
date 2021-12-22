import React from "react";
import PropTypes from "prop-types";


const styles = {
  active: {
    display: "inherit"
  },
  inactive: {
    display: "none"
  }
}


class Accordion extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({active: !this.state.active})
  }
  
  render () {
    const stateStyle = this.state.active ? styles.active : styles.inactive;
    
    return (
      <section>
        <a onClick={this.toggle}>{this.props.summary}</a>
        <p style={stateStyle}>{this.props.details}</p>
      </section>
    )
  }
};

Accordion.propTypes = {
  summary: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
};

export default Accordion;
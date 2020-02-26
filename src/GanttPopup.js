import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttPopup extends Component {
  render() {
    const { title, style, markerTime, activeStep, titleStyle } = this.props;
    const { dateFormat } = this.context;
    return (
      <div style={style}>
        <span style={titleStyle}>{title}</span>
        {moment(markerTime).format(dateFormat)}
        <br />
        {activeStep.name}
      </div>
    );
  }
}

GanttPopup.propTypes = {
  style: PropTypes.object.isRequired,
  markerTime: PropTypes.object.isRequired,
  activeStep: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object
};

GanttPopup.contextTypes = {
  dateFormat: PropTypes.string.isRequired
};

GanttPopup.defaultProps = {
  titleStyle: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    borderBottom: '1px solid #cfcfcf'
  }
};
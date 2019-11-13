import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import GanttTimeline from './GanttTimeline';

export { default as GanttRow } from './GanttRow';

export default class ReactGantt extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dateFormat: PropTypes.string,
    dayFormat: PropTypes.string,
    debug: PropTypes.bool,
    hourFormat: PropTypes.string,
    leftBound: PropTypes.object,
    minuteFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    rightBound: PropTypes.object,
    secondFormat: PropTypes.string,
    style: PropTypes.object,
    templates: PropTypes.object,
    timeFormat: PropTypes.string,
    timelineStyle: PropTypes.object,
    weekFormat: PropTypes.string,
    yearFormat: PropTypes.string
  };
  static childContextTypes = {
    dateFormat: PropTypes.string.isRequired,
    dayFormat: PropTypes.string,
    debug: PropTypes.bool.isRequired,
    hourFormat: PropTypes.string,
    leftBound: PropTypes.object.isRequired,
    minuteFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    rightBound: PropTypes.object.isRequired,
    secondFormat: PropTypes.string,
    templates: PropTypes.object.isRequired,
    timeFormat: PropTypes.string,
    timelineWidth: PropTypes.number.isRequired,
    weekFormat: PropTypes.string,
    yearFormat: PropTypes.string
  };
  static defaultProps = {
    dateFormat: 'YY-MM-DD',
    dayFormat: 'YY-MM-DD',
    debug: false,
    hourFormat: 'HH',
    leftBound: moment().toDate(),
    minuteFormat: 'HH:mm',
    monthFormat: 'YY-MM-DD',
    rightBound: moment().toDate(),
    secondFormat: 'HH:mm:ss',
    style: {},
    templates: {},
    timeFormat: 'YY-MM-DD HH:mm',
    timelineStyle: {
      minTickWidth: '60px',
      width: '600px',
      maxTicks: 10
    },
    weekFormat: 'YY-MM-DD',
    yearFormat: 'YY-MM-DD'
  };

  state = {
    timelineWidth: 500
  };

  getChildContext() {
    return {
      dateFormat: this.props.dateFormat,
      dayFormat: this.props.dayFormat,
      debug: this.props.debug,
      hourFormat: this.props.hourFormat,
      leftBound: this.props.leftBound,
      minuteFormat: this.props.minuteFormat,
      monthFormat: this.props.monthFormat,
      rightBound: this.props.rightBound,
      secondFormat: this.props.secondFormat,
      templates: this.props.templates,
      timeFormat: this.props.timeFormat,
      timelineWidth: this.state.timelineWidth,
      weekFormat: this.props.weekFormat,
      yearFormat: this.props.yearFormat
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    this.resizeEventListener = window.addEventListener('resize', e =>
      this.handleResize(e)
    );
    this.handleResize();
  }

  componentWillUnmount() {
    if (this.resizeEventListener) {
      this.resizeEventListener.removeEventListener();
    }
  }

  handleResize() {
    const { timelineStyle } = this.props;
    this.setState({ timelineWidth: parseInt(timelineStyle.width, 10)});
  }

  render() {
    const thStyle = { whiteSpace: 'nowrap' };
    const { timelineStyle } = this.props;
    return (
      <div style={this.props.style}>
        <table style={{ width: '100%' }} cellSpacing={0}>
          <thead>
            <tr>
              <th
                style={{
                  ...thStyle,
                  width: '0px'
                }}
              />
              <th
                ref="timeline"
                style={{
                  ...thStyle,
                  width: timelineStyle.width
                }}
              >
                <GanttTimeline
                  style={this.props.timelineStyle}
                  rows={this.props.children}
                />
              </th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}

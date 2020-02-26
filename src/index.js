import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import GanttTimeline from './GanttTimeline';

export { default as GanttRow } from './GanttRow';

export default class ReactGantt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timelineWidth: 500 // eslint-disable-line
    };
  }


  getChildContext() {
    const { dateFormat,
      dayFormat,
      debug,
      hourFormat,
      leftBound,
      minuteFormat,
      monthFormat,
      rightBound,
      secondFormat,
      templates,
      timeFormat,
      timelineWidth,
      weekFormat,
      yearFormat } = this.props;
    return {
      dateFormat,
      dayFormat,
      debug,
      hourFormat,
      leftBound,
      minuteFormat,
      monthFormat,
      rightBound,
      secondFormat,
      templates,
      timeFormat,
      timelineWidth,
      weekFormat,
      yearFormat
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
    const { width } = this.props;
    this.setState({ timelineWidth: parseInt(width, 10) }); // eslint-disable-line
  }

  render() {
    const thStyle = { whiteSpace: 'nowrap' };
    const { width, enableTimeline, id, timelineStyle, children, style } = this.props;
    return (
      <div style={style}>
        <table id={id} style={{ width: '100%' }} cellSpacing={0}>
          <thead>
            <tr>
              <th
                aria-label="Spacer"
                style={{
                  ...thStyle,
                  width: '0px'
                }}
              />
              <th
                aria-label="Spacer"
                ref="timeline"
                style={{
                  ...thStyle,
                  width
                }}
              />
            </tr>
          </thead>
          <tbody>
            {children}
            <tr>
              <td
                style={{
                  ...thStyle,
                  width: '0px'
                }}
              />
              <td
                ref="timeline"
                style={{
                  ...thStyle,
                  width
                }}
              >
                {enableTimeline && (
                  <GanttTimeline
                    style={timelineStyle}
                    rows={children}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


ReactGantt.propTypes = {
  children: PropTypes.node.isRequired,
  dateFormat: PropTypes.string,
  dayFormat: PropTypes.string,
  debug: PropTypes.bool,
  enableTimeline: PropTypes.bool,
  hourFormat: PropTypes.string,
  leftBound: PropTypes.object,
  minuteFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  rightBound: PropTypes.object,
  secondFormat: PropTypes.string,
  style: PropTypes.object,
  templates: PropTypes.object,
  timeFormat: PropTypes.string,
  width: PropTypes.string,
  timelineStyle: PropTypes.object,
  weekFormat: PropTypes.string,
  yearFormat: PropTypes.string,
  id: PropTypes.string,
  timelineWidth: PropTypes.number
};

ReactGantt.childContextTypes = {
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

ReactGantt.defaultProps = {
  dateFormat: 'YY-MM-DD',
  dayFormat: 'YY-MM-DD',
  debug: false,
  hourFormat: 'HH',
  leftBound: moment().toDate(),
  minuteFormat: 'HH:mm',
  monthFormat: 'YY-MM-DD',
  rightBound: moment().toDate(),
  secondFormat: 'HH:mm:ss',
  id: 'react-gantt',
  style: {},
  templates: {},
  timeFormat: 'YY-MM-DD HH:mm',
  width: '600px',
  timelineWidth: 500,
  enableTimeline: false,
  timelineStyle: {
    minTickWidth: '60px',
    maxTicks: 10,
    tickStyle: '1px solid rgba(224, 224, 224, 1)',
    labelFont: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      fontSize: '0.75rem',
      fontWeight: '500'
    }
  },
  weekFormat: 'YY-MM-DD',
  yearFormat: 'YY-MM-DD'
};


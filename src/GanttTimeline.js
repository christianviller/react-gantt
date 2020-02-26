import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttTimeline extends Component {

  preferredTicks = [
    { seconds: 31535965.4396976, unit: 'year', absolute: false },
    { seconds: 2628000, unit: 'month', absolute: false },
    { seconds: 604800, unit: 'week', absolute: false },
    { seconds: 86400, unit: 'day', absolute: false },
    { seconds: 3600, unit: 'hour', absolute: true },
    { seconds: 1800, unit: 'minute', absolute: true }, // 30 min
    { seconds: 1200, unit: 'minute', absolute: true }, // 20 min
    { seconds: 900, unit: 'minute', absolute: true }, // 15 min
    { seconds: 600, unit: 'minute', absolute: true }, // 10 min
    { seconds: 300, unit: 'minute', absolute: true }, // 5 min
    { seconds: 120, unit: 'minute', absolute: true }, // 2 min
    { seconds: 60, unit: 'minute', absolute: true } // 1 min
  ]

  getTick() {
    const { style } = this.props;
    const { leftBound, rightBound } = this.context;
    const timelineDuration = moment(rightBound).diff(moment(leftBound), 'seconds');

    let count = 0;
    let i = 1;
    while (count < style.maxTicks && i++ < this.preferredTicks.length) {
      count = Math.ceil(timelineDuration / this.preferredTicks[i].seconds)
    }
    const tick = this.preferredTicks[i - 1];
    count = Math.ceil(timelineDuration / tick.seconds)

    return {
      width: this.durationToWidth(tick.seconds),
      step: tick.seconds,
      unit: tick.unit,
      count
    }
  }

  getTimeFormat(unit) {
    const {context} = this;
    switch (unit) {
      case 'second':
        return context.secondFormat;
      case 'minute':
        return context.minuteFormat;
      case 'hour':
        return context.hourFormat;
      case 'day':
        return context.dayFormat;
      case 'week':
        return context.weekFormat;
      case 'month':
        return context.monthFormat;
      case 'year':
        return context.yearFormat;
    }
    return null;
  }


  durationToWidth(duration) {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }

  debugRender() {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const tick = this.getTick();

    return (
      <div>
        <div align="left">
          Timeline Width: 
          {timelineWidth}
          <br />
          Left Bound: 
          {moment(leftBound).format("YYYY-MM-DD HH:mm:ss")}
          <br />
          Right Bound: 
          {moment(rightBound).format("YYYY-MM-DD HH:mm:ss")}
          <br />
          Tick Unit: 
          {tick.unit}
          <br />
          Tick Width: 
          {tick.width}
          <br />
          Tick Count: 
          {tick.count}
        </div>
        <div>{this.defaultRender()}</div>
      </div>
    );
  }

  defaultRender() {
    const {style} = {...(this.props)};    
    const tick = this.getTick();
    const tickWidth = _.clone(parseInt(style.tickStyle, 10)) || 2;
    const paddingLeft = _.clone(parseInt(style.paddingLeft, 10)) || 4;
    delete style.paddingLeft;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        {_.map(_.range(tick.count), index => {
          return (
            <div
              key={`tick${index}`}
              style={{
                ...style,
                height: '20px',
                borderLeft: style.tickStyle,
                width: `${tick.width - paddingLeft - tickWidth}px`,
                float: 'left',
                margin: '0px',
                padding: '0px',
                textAlign: 'left',
                paddingLeft: `${paddingLeft}px`
              }}
            >
              <div style={style.labelFont}>
                {this.renderTickLabel(tick, index)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderTickLabel(tick, index) {
    const { leftBound } = this.context;
    const tickTime = moment(leftBound).add((index * tick.step), 'seconds');
    const format = this.getTimeFormat(tick.unit);
    return tickTime.format(format);
  }

  render() {
    const {debug} = this.context;
    if (debug) {
      return this.debugRender();
    }
    return this.defaultRender();
  }
}

GanttTimeline.propTypes = {
  style: PropTypes.object.isRequired
};

GanttTimeline.contextTypes = {
  dateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string,
  minuteFormat: PropTypes.string,
  secondFormat: PropTypes.string,
  hourFormat: PropTypes.string,
  dayFormat: PropTypes.string,
  weekFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  yearFormat: PropTypes.string,
  debug: PropTypes.bool.isRequired,
  leftBound: PropTypes.object.isRequired,
  rightBound: PropTypes.object.isRequired,
  timelineWidth: PropTypes.number.isRequired
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';



export default class GanttBar extends Component {


  getSteps() {
    const { templates } = this.context;
    const { templateName } = this.props;
    const template = templates[templateName];
    return _.map(template.steps, (step, index) => {
      return this.getStep(index, template);
    });
  }

  getStep(index, template) {
    const { leftBound, rightBound } = this.context;
    const { steps } = this.props;
    const stepStartTime = steps[index];
    const stepEndTime = template.steps.length > index ? steps[index + 1] : null;
    if (!stepEndTime) return null;
    const stepDuration = moment(stepEndTime).diff(stepStartTime, 'seconds');
    const theoreticalWidth = this.durationToWidth(stepDuration);
    const startPixel = this.timeToPixel(stepStartTime);
    const endPixel = this.timeToPixel(stepEndTime);
    const displayWidth = endPixel - startPixel;
    const displayBarLabel = template.displayBarLabel && true;
    let offTimelineLeft = false;
    let offTimelineRight = false;
    if (moment(stepStartTime).diff(moment(leftBound), 'seconds') < 0) {
      offTimelineLeft = true;
    }
    if (moment(rightBound).diff(moment(stepEndTime), 'seconds') < 0) {
      offTimelineRight = true;
    }
    return {
      name: template.steps[index].name,
      color: template.steps[index].color,
      duration: stepDuration,
      theoreticalWidth,
      displayWidth,
      startPixel,
      displayBarLabel,
      endPixel,
      offTimelineLeft,
      offTimelineRight,
      startTime: stepStartTime,
      endTime: stepEndTime
    };
  }

  durationToWidth(duration) {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }

  timeToPixel(time) {
    const { leftBound, timelineWidth } = this.context;
    const leftBoundPixel = 0;
    const rightBoundPixel = timelineWidth;
    const timeDurationFromLeftBound = moment(time).diff(leftBound, 'seconds');
    const timeWidthFromLeftBound = this.durationToWidth(
      timeDurationFromLeftBound
    );
    const pixel = timeWidthFromLeftBound;
    if (leftBoundPixel < pixel && pixel < rightBoundPixel) return pixel;
    if (pixel <= leftBoundPixel) return leftBoundPixel;
    if (pixel >= rightBoundPixel) return rightBoundPixel;
    return null;
  }

  durationLabel(duration) {
    if (duration < 60) {
      return `${duration}s`
    }
    const minutes = duration / 60;
    if (minutes < 200) {
      return `${minutes}m`
    }
    const hours = minutes / 60;
    if (hours < 48) {
      return `${hours}h`
    }
    const days = hours / 24;
    return `${days}d`
  }

  defaultRender() {
    const { style, onClick, onKeyPress, id } = this.props;
    const idPrefix = (id === "" ? `step-` : `${id}-step-`)
    const steps = this.getSteps();
    return (
      <div ref="bar" style={{ display: 'flex' }}>
        {_.map(steps, (step, index) => {
          return (
            <div key={`reg${step.name}${index}`}>
              <button
                type="button"
                id={`${idPrefix}${index}`}
                style={{
                  ...style,
                  borderTopLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                  borderBottomLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                  borderTopRightRadius: step.offTimelineRight ? '6%' : '0%',
                  borderBottomRightRadius: step.offTimelineRight ? '6%' : '0%',
                  width: `${step.displayWidth}px`,
                  backgroundColor: step.color,
                  marginLeft: index === 0 ? `${step.startPixel}px` : '0px'
                }}
                onClick={onClick}
                onKeyPress={onKeyPress}
              >
                {step.displayBarLabel && this.durationLabel(step.duration)}
              </button>

            </div>
          );
        })}
      </div>
    );
  }

  debugRender() {
    const { dateFormat } = this.context;
    const steps = this.getSteps();
    return (
      <div ref="bar">
        {
          _.map(steps, (step, index) => {
            return (
              <div key={`deb${step.name}${index}`}>
                <div>
                  Start Time: 
                  {moment(step.startTime).format(dateFormat)}
                  <br />
                  End Time: 
                  {moment(step.endTime).format(dateFormat)}
                  <br />
                  Start Pixel: 
                  {step.startPixel}
                  <br />
                  End Pixel: 
                  {step.endPixel}
                  <br />
                  Theoretical Width: 
                  {step.theoreticalWidth}
                  <br />
                  Display Width: 
                  {step.displayWidth}
                </div>
                <div
                  style={{
                    height: '20px',
                    width: `${step.displayWidth}px`,
                    backgroundColor: step.color,
                    marginLeft: step.startPixel
                  }}
                />
                <hr />
              </div>
            );
          })
        }
        {this.defaultRender()}
      </div>
    );
  }

  render() {
    const {debug} = this.context
    if (debug) return this.debugRender();
    return this.defaultRender();
  }
}


GanttBar.propTypes = {
  templateName: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func
};

GanttBar.contextTypes = {
  templates: PropTypes.object.isRequired,
  dateFormat: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,
  leftBound: PropTypes.object.isRequired,
  rightBound: PropTypes.object.isRequired,
  timelineWidth: PropTypes.number.isRequired,
  activeRow: PropTypes.number
};

GanttBar.defaultProps = {
  onClick: null,
  onKeyPress: null,
  id: 'gantt-bar'
}
import React, { Component } from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import ReactGantt, { GanttRow } from '../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <ReactGantt
          templates={{
            myTasks: {
              title: 'My Tasks',
              steps: [
                {
                  name: 'Task Phase One',
                  color: '#0099FF'
                },
                {
                  name: 'Task Phase Two',
                  color: '#FF9900'
                }
              ]
            }
          }}
          leftBound={moment()
            .set({ hour: 0, date: 30, month: 5, year: 2016 })
            .toDate()}
          rightBound={moment()
            .set({ hour: 0, date: 29, month: 8, year: 2016 })
            .toDate()}
          dateFormat="YYYY-MM-DD"
          debug={false}
        >
          <GanttRow
            title="Task 1"
            templateName="myTasks"
            steps={[
              moment()
                .set({ hour: 0, date: 1, month: 6, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 4, month: 8, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 17, month: 8, year: 2016 })
                .toDate()
            ]}
          />
          <GanttRow
            title="Task 2"
            templateName="myTasks"
            steps={[
              moment()
                .set({ hour: 0, date: 27, month: 2, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 9, month: 7, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 22, month: 7, year: 2016 })
                .toDate()
            ]}
            onClick={() => console.log("Clicked")}
          />
          <GanttRow
            title="Task 3"
            templateName="myTasks"
            steps={[
              moment()
                .set({ hour: 0, date: 12, month: 6, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 2, month: 7, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 2, month: 8, year: 2016 })
                .toDate(),
              moment()
                .set({ hour: 0, date: 24, month: 9, year: 2016 })
                .toDate()
            ]}
          />
        </ReactGantt>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
render(<Demo />, document.getElementById('demo'));

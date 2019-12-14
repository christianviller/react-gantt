import React from 'react';

import ReactGantt, { GanttRow } from '../src';

const startDate = new Date(2000,0,1);
const getMinutesAdd = (minutes) => new Date(startDate.getTime() + minutes * 60000)

export default function MinuteDemo() {
  return (
    <div>
      <ReactGantt
        templates={{
          myTasks: {
            title: 'My Tasks',
            displayBarLabel: true,
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

        leftBound={startDate}
        rightBound={getMinutesAdd(120)}
        debug={false}
      >
        <GanttRow
          title="Task 1"
          id="row-one"
          barStyle={{
            height: '20px',
            marginTop: '3px',
            marginBottom: '3px'
          }}
          templateName="myTasks"
          steps={[
            startDate,
            getMinutesAdd(60),
            getMinutesAdd(120)
          ]}
        />
        <GanttRow
          title="Task 2"
          templateName="myTasks"
          id="row-two"
          barStyle={{
            height: '20px',
            marginTop: '3px',
            marginBottom: '3px'
          }}
          steps={[
            startDate,
            getMinutesAdd(30),            
            getMinutesAdd(40)
          ]}
          onClick={null}
        />
        <GanttRow
          title="Task 3"
          id="row-three"
          templateName="myTasks"
          barStyle={{
            height: '20px',
            marginTop: '3px',
            marginBottom: '3px'
          }}
          steps={[
            getMinutesAdd(40),
            getMinutesAdd(100),
            getMinutesAdd(120)
          ]}
        />
      </ReactGantt>
    </div>
  )
}
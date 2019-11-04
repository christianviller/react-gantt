import React from 'react';
import moment from 'moment';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ReactGantt, { GanttRow } from '../src';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

TabPanel.defaultProps = {
  children: null
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Demo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
            leftAdornment={<h4>h6 task 1</h4>}
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
      </TabPanel>
      <TabPanel value={value} index={1}>
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
        
          timelineStyle={{
            minWidth: '600px'
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
            leftAdornment={<h4>h6 task 1</h4>}
            barStyle={{
              height: '20px',
              marginTop: '3px',
              marginBottom: '3px',
            }}
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
            barStyle={{
              height: '20px',
              marginTop: '3px',
              marginBottom: '3px',
            }}
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
            barStyle={{
              height: '20px',
              marginTop: '3px',
              marginBottom: '3px',
            }}
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
      </TabPanel>
      <TabPanel value={value} index={2}>
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
            leftAdornment={<h4>h6 task 1</h4>}
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
      </TabPanel>
    </div>
  );
}




// eslint-disable-next-line no-undef
render(<Demo />, document.getElementById('demo'));

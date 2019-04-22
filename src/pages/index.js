import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import DisplayCard from '../components/DisplayCard';
import AddMeetingDialog from '../components/AddMeetingDialog';
import {getMeetingData} from '../utils/NetworkUtils';

const styles = () => ({ 
  root: {
    marginHorizontal: 20,
    paddingVertical: 50,
    display: 'flex',
    flexDirection: 'row',
  },
});

const stringToDate = function(dateString) {
  const [dd, mm, yyyy] = dateString.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`);
};

const isSameDate = (d1, d2) => {
  return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
}

const isDateToday = (dateString) => {
  const inputDate = stringToDate(dateString);
  const currentDate = new Date();
  return isSameDate(currentDate, inputDate);
}

const isTimingCurrent = (startTime, endTime) => {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const [startTimeHour, startTimeMinutes] = startTime.split(':');
  const [endTimeHour, endTimeMinutes] = endTime.split(':');
  debugger;
  return ((currentHours >= parseInt(startTimeHour, 10) && currentHours <= parseInt(endTimeHour, 10)) &&
    (currentMinutes >= parseInt(startTimeMinutes, 10) && currentMinutes <= parseInt(endTimeMinutes, 10)));
}


class Index extends React.Component {
  constructor(props){
    super(props);
    const landingData = this.getCardsData();
    this.state = {
      ...landingData,
      showAddMeetingDialog: true
    };
  }
  
  getCardsData = () => {
    const meetingsData = getMeetingData();
    const buildings = meetingsData.data.Buildings;
    let totalRooms = 0;
    let totalMeetingsToday = 0;
    let totalMeetingsGoingOn = 0;
    let totalMeetingRoomsFreeNow = 0;
    buildings.forEach((building) => {
      totalRooms += building.meetingRooms.length;
      building.meetingRooms.forEach((meetingRoom) => {
        let roomFreeRightNow = true;
        meetingRoom.meetings.forEach((meeting) => {
          const isMeetingToday = isDateToday(meeting.date);
          const isMeetingAtCurrentTime = isTimingCurrent(meeting.startTime, meeting.endTime);
          if (isMeetingToday){
            totalMeetingsToday ++;
          }
          if (isMeetingToday && isMeetingAtCurrentTime){
            totalMeetingsGoingOn ++;
            roomFreeRightNow = false;
          }
        });
        if (roomFreeRightNow){
          totalMeetingRoomsFreeNow ++
        }
      });
    });
    return {
      buildings: buildings,
      rooms: {
        total: totalRooms,
        free: totalMeetingRoomsFreeNow
      },
      meetings: {
        total: totalMeetingsToday,
        goingNow: totalMeetingsGoingOn
      },
    };
  }

  handleClick = () => {
    this.setState({
      showAddMeetingDialog: true
    })
  }
  render() {
    const { classes } = this.props;
    const {meetings, rooms} = this.state;
    const roomsData = [
      {
        label: 'Total',
        value: rooms.total
      },
      {
        label: 'Free Now',
        value: rooms.free
      }
    ];
    const meetingsData = [
      {
        label: 'Total Meetings Today',
        value: meetings.total
      },
      {
        label: 'Total Meetings Going on',
        value: meetings.goingNow
      }
    ];

    return (
      <div>
        <div className={classes.root}>
          <DisplayCard 
            title='Buildings'
            data={[{label: 'Total', value: this.state.buildings.length}]}
          />
          <DisplayCard 
            title='Rooms'
            data={roomsData}
          />
          <DisplayCard 
            title='Meetings'
            data={meetingsData}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Add a Meeting
        </Button>
        <AddMeetingDialog 
          showDialog={this.state.showAddMeetingDialog}
          buildings={this.state.buildings}
        />
        
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

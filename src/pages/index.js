import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import DisplayCard from '../components/DisplayCard';
import AddMeetingDialog from '../components/AddMeetingDialog';
import {getMeetingData} from '../utils/NetworkUtils';
import {stringToDate, isSameDate, isDateToday, isTimingCurrent} from '../utils/CommonUtils';

const styles = () => ({ 
  root: {
    marginHorizontal: 20,
    paddingVertical: 50,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 'auto',
    backgroundColor: '#c1bf6a',
    paddingBottom: '100%'
  },
  addBtn: {
    width: 150
  },
  bottomContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

class Index extends React.Component {
  constructor(props){
    super(props);
    const landingData = this.getCardsData();
    this.state = {
      ...landingData,
      showAddMeetingDialog: false,
      showSuccessToast: false
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

  hideAddMeetingDialog = (isBookingSuccess) => {
    this.setState({
      showAddMeetingDialog: false
    });

    if (isBookingSuccess) {
      this.setState({showSuccessToast: true})
      setTimeout(() => {
        this.setState({showSuccessToast: false})
      }, 4000);
    }
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
      <div className={classes.mainContainer}>
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
        <div className={classes.bottomContainer}>
          <Button className={classes.addBtn} variant="contained" color="primary" onClick={this.handleClick}>
            Add a Meeting
          </Button>
          <AddMeetingDialog 
            showDialog={this.state.showAddMeetingDialog}
            buildings={this.state.buildings}
            hideDialog={this.hideAddMeetingDialog}
          />
        </div>
        <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
          open={this.state.showSuccessToast}
          onClose={this.handleClose}
          message={<span >Meeting Room Booked Successfully !</span>}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

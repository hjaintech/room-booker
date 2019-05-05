import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import DisplayCard from '../../components/DisplayCard';
import AddMeetingDialog from '../../components/AddMeetingDialog';
import {getMeetingData} from '../../utils/NetworkUtils';
import {stringToDate, isSameDate, isDateToday, isTimingCurrent} from '../../utils/CommonUtils';
import styleSheet from './LandingCss';
import {loadMeetingData} from '../../actions/landingActions';

const styles = () => (styleSheet);

class Index extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadMeetingData();
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
    const {meetings, rooms} = this.props;
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
            data={[{label: 'Total', value: this.props.buildings.length}]}
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
            showDialog={this.props.showAddMeetingDialog}
            buildings={this.props.buildings}
            hideDialog={this.hideAddMeetingDialog}
          />
        </div>
        
        <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
          open={this.props.showSuccessToast}
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

const mapStateToProps = state => ({
  ...state.meetingRoomReducer
});

const mapDispatchToProps = dispatch => ({
  loadMeetingData: () => dispatch(loadMeetingData())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Index)));

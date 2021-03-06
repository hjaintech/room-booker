import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import AddMeetingDialog from '../../components/AddMeetingDialog';
import styleSheet from './LandingCss';
import {loadMeetingData, hideAddMeetingDialog, showAddMeetingDialog, closeAddMeetingDialog} from '../../actions/landingActions';
import LandingCardsSection from '../../components/LandingCardsSection';

const styles = () => (styleSheet);

class Index extends React.Component {

  componentDidMount() {
    this.props.loadMeetingData();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <LandingCardsSection
          buildings={this.props.buildings}
          rooms={this.props.rooms}
          meetings={this.props.meetings}
        />
        <div className={classes.bottomContainer}>
          <Button className={classes.addBtn} variant="contained" color="primary" onClick={this.props.showAddMeetingDialog}>
            Add a Meeting
          </Button>
          <AddMeetingDialog 
            showDialog={this.props.isAddMeetingDialogVisible}
            buildings={this.props.buildings}
            hideDialog={this.props.closeAddMeetingDialog}
          />
        </div>
        
        <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
          open={this.props.isSuccessToastVisible}
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

const mapStateToProps = state => {
  const {buildings, rooms, meetings, isAddMeetingDialogVisible, isSuccessToastVisible} = state.meetingRoomReducer;
  return {
    buildings,
    rooms,
    meetings,
    isAddMeetingDialogVisible,
    isSuccessToastVisible
  };
};


const mapDispatchToProps = dispatch => ({
  loadMeetingData: () => dispatch(loadMeetingData()),
  hideAddMeetingDialog: () => dispatch(hideAddMeetingDialog()),
  showAddMeetingDialog: () => dispatch(showAddMeetingDialog()),
  closeAddMeetingDialog: (isBookingSuccess) => dispatch(closeAddMeetingDialog(isBookingSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Index)));

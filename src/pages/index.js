import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import DisplayCard from '../components/DisplayCard';
import AddMeetingDialog from '../components/AddMeetingDialog';

const styles = () => ({ 
  root: {
    marginHorizontal: 20,
    paddingVertical: 50,
    display: 'flex',
    flexDirection: 'row',
  },
});

class Index extends React.Component {
  state = {
    buildings: 4,
    rooms: {
      total: 20,
      free: 5
    },
    meetings: {
      total: 100,
      goingNow: 10
    },
    showAddMeetingDialog: true
  };

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
            data={[{label: 'Total', value: this.state.buildings}]}
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
        />
        
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

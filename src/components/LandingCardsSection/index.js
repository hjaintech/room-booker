import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DisplayCard from '../DisplayCard';
import withRoot from '../../withRoot';
import styleSheet from './LandingCardsSectionCss';

const styles = () => (styleSheet);

const LandingCardsSection = (props) => {
    const { classes } = props;
    const {meetings, rooms, buildings} = props;
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
    return (<div className={classes.root}>
        <DisplayCard 
          title='Buildings'
          data={[{label: 'Total', value: buildings.length}]}
        />
        <DisplayCard 
          title='Rooms'
          data={roomsData}
        />
        <DisplayCard 
          title='Meetings'
          data={meetingsData}
        />
      </div>);
};

export default withRoot(withStyles(styles)(LandingCardsSection));
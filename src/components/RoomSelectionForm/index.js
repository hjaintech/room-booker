import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MeetingRoomRow from '../MeetingRoomRow';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class AlignItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRoom: ''
        };
    }

    onMeetingRoomSelected = (roomName) => {
        debugger;
        this.setState({selectedRoom: roomName});
    }

    onBookPress = () => {
        this.props.hideDialog(true);
    }

    render() {
        const { classes, availableRooms, building } = this.props;
        const {selectedRoom} = this.state;

        return (
            <div>
                <DialogTitle>Please Select one of the free rooms</DialogTitle>
                <DialogContent>
                    <List className={classes.root}>
                        {
                            availableRooms.map((room) => (
                                <MeetingRoomRow
                                    roomName={room.name}
                                    building={building}
                                    floor={room.floor}
                                    onSelected={this.onMeetingRoomSelected}
                                    selected={room.name === selectedRoom}
                                />
                            ))
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.props.hideDialog(false)}} color="primary">CLOSE</Button>
                    <Button onClick={this.onBookPress} color="primary">Book</Button>
                </DialogActions>
            </div>

        );
    }

}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);

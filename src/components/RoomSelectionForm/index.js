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

function AlignItemsList(props) {
    const { classes } = props;
    const meetingRowData = [{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    },{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    },{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    },{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    },{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    },{
        roomName: 'Gujarat Room',
        building: '5',
        floor: '2'
    }];

    return (
        <div>
            <DialogTitle id="form-dialog-title">Please Select one of the free rooms</DialogTitle>
            <DialogContent>
                <List className={classes.root}>
                    {
                        meetingRowData.map((meeting) => (
                            <MeetingRoomRow 
                                roomName={meeting.roomName}
                                building={meeting.building}
                                floor={meeting.floor}
                            />
                        ))
                    }
                </List>
            </DialogContent>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={true}
                autoHideDuration={6000}
                //onClose={this.handleClose}
                >
                <div>Some text in snackbar</div>
                {/* <MySnackbarContentWrapper
                    onClose={this.handleClose}
                    variant="success"
                    message="This is a success message!"
                /> */}
                </Snackbar>
            <DialogActions>
                <Button color="primary">Book</Button>
            </DialogActions>
        </div>

    );
}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);

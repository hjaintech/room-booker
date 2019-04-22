import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
    return (
        <div>
            <DialogTitle id="form-dialog-title">Please Select one of the free rooms</DialogTitle>
            <DialogContent>
                <List className={classes.root}>
                    <MeetingRoomRow />
                    <MeetingRoomRow />
                    <MeetingRoomRow />
                    <MeetingRoomRow />
                </List>
            </DialogContent>
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

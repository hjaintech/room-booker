import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AddMeetingForm from '../AddMeetingForm';
import RoomSelectionForm from '../RoomSelectionForm';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dialog: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});
class AddMeetingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }
    render(){
        const {step} = this.state;
        const {classes} = this.props;
        return (
            <Dialog className={classes.dialog} open={this.props.showDialog} onClose={this.handleClose} >
                {step === 0 && <AddMeetingForm nextPressed={() => {this.setState({step: 1})}} />}
                {step === 1 && <RoomSelectionForm />}
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddMeetingDialog);
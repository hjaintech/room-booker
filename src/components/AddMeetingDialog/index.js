import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AddMeetingForm from '../AddMeetingForm';
import RoomSelectionForm from '../RoomSelectionForm';

class AddMeetingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }
    render(){
        const {step} = this.state;
        return (
            <Dialog open={this.props.showDialog} onClose={this.handleClose} >
                {step === 0 && <AddMeetingForm nextPressed={() => {this.setState({step: 1})}} />}
                {step === 1 && <RoomSelectionForm />}
            </Dialog>
        );
    }
}

export default AddMeetingDialog;
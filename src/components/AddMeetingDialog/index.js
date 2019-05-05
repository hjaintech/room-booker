import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AddMeetingForm from '../AddMeetingForm';
import RoomSelectionForm from '../RoomSelectionForm';
import { withStyles } from '@material-ui/core/styles';
import {isSameDate} from '../../utils/CommonUtils';

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
        this.state = this.getInitialStateObj();
    }
    getInitialStateObj = () => ({
        step: 0,
        selectedBuilding: '',
        availableRooms: ''
    });
    componentDidMount() {
        this.setState({
            step: 0,
            selectedBuilding: '',
            availableRooms: ''
        });
    }
    hideDialog = (...args) => {
        this.setState(this.getInitialStateObj());
        this.props.hideDialog(...args);
    }
    step1NextPressed(dataFromPrevStep, buildings) {
        const buildingData = buildings.find((building) => {return building.name === dataFromPrevStep.building});
        const meetingRooms = buildingData.meetingRooms || [];
        meetingRooms.filter((room) => {
            const meetings = room.meetings || [];
            const applicableMeetings = meetings.filter((meeting) => {
                const [year, month, date] = dataFromPrevStep.date;
                const dateString = `${date}/${month}/${year}`;
                return isSameDate(new Date(dateString), new Date(meeting.date));
            });
            applicableMeetings.push({
                startTime: dataFromPrevStep.startTime,
                endTime: dataFromPrevStep.endTime,
                title: 'Dummy event', // dummy title
                date: null // dummy date
            });
            // sort meeting rooms on basis of start time
            const sortedMeetings = applicableMeetings.sort((m1, m2) => {
                const [m1Hours, m1Minutes] = m1.split(':'); 
                const [m2Hours, m2Minutes] = m2.split(':'); 
                if (parseInt(m1Hours, 10) === parseInt(m2Hours, 10)) {
                    return parseInt(m1Minutes, 10) < parseInt(m2Minutes, 10)
                }
                return m1Hours < m2Hours
            });

            // Find overlaps and return false if found.
            for(var i = 0 ; i < sortedMeetings.length -1; i ++){
                const currentEndTime = parseInt(sortedMeetings[i].endTime.split(':').join(), 10);
                const nextStartTime = parseInt(sortedMeetings[i+1].startTime.split(':').join(), 10);
                if (currentEndTime > nextStartTime ) {
                    return false;
                }
            }
            return true;

        });
        
        this.setState({step: 1, selectedBuilding: dataFromPrevStep.building ,availableRooms: meetingRooms});
    }

    render(){
        const {step, availableRooms, selectedBuilding} = this.state;
        const {classes} = this.props;
        return (
            <Dialog className={classes.dialog} open={this.props.showDialog} onClose={this.handleClose} >
                {step === 0 && <AddMeetingForm nextPressed={(...args) => this.step1NextPressed(...args, this.props.buildings)} buildings= {this.props.buildings} hideDialog={this.hideDialog}/>}
                {step === 1 && <RoomSelectionForm availableRooms={availableRooms} building={selectedBuilding} hideDialog={this.hideDialog}/>}
            </Dialog>
        );
    }
}

export default withStyles(styles)(AddMeetingDialog);
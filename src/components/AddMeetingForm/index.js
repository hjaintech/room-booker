import React from 'react';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fullWidth: {
        width: '100%',
        marginBottom: 20
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});
class AddMeetingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            startTime: '',
            endTime: '',
            building: ''
        };
    }

    onNextPressed = () => {
        const {date, startTime, endTime, building} = this.state;
        if (date && startTime && endTime && building) {
            this.props.nextPressed({...this.state});
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <DialogTitle className={classes.flexRow}>Add Meeting</DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.fullWidth}
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={this.state.date}
                        onChange={(e) => {this.setState({date: e.target.value})}}
                        format={'DD/MM/YYYY'}
                    />
                    <TextField
                        label="Start Time"
                        className={classes.fullWidth}
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                        value={this.state.startTime}
                        onChange={(e) => {this.setState({startTime: e.target.value})}}
                    />
                    <TextField
                        label="End Time"
                        className={classes.fullWidth}
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                        value={this.state.endTime}
                        onChange={(e) => {this.setState({endTime: e.target.value})}}
                    />
                    <FormControl className={classes.fullWidth}>
                        <InputLabel htmlFor="age-simple">Building</InputLabel>
                        <Select value={this.state.building} onChange={(e) => {this.setState({building: e.target.value})}}>
                            {
                                this.props.buildings.map((building) => {
                                    return (<MenuItem value={building.name}>{building.name}</MenuItem>);
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.props.hideDialog(false)}} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.onNextPressed} color="primary">
                        Next
                    </Button>
                </DialogActions>
            </div>);
    }
}
export default withStyles(styles)(AddMeetingForm);
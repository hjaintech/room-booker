import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class AddMeetingForm extends React.Component {
    render() {
        return (
            <div>
                <DialogTitle id="form-dialog-title">Add Meeting</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Start Time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                    />
                    <TextField
                        label="End Time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                    />
                    <FormControl>
                        <InputLabel htmlFor="age-simple">Building</InputLabel>
                        <Select
                            value={5}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem value="">
                                <em>Select Building</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.nextPressed} color="primary">
                        Next
                </Button>
                </DialogActions>
            </div>);
    }
}

export default AddMeetingForm;
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
                    />
                    <TextField
                        label="Start Time"
                        className={classes.fullWidth}
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                    />
                    <TextField
                        label="End Time"
                        className={classes.fullWidth}
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 900 }}
                    />
                    <FormControl className={classes.fullWidth}>
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
export default withStyles(styles)(AddMeetingForm);
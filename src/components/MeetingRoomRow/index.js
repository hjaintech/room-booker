import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';


const MeetingRoomRow = (props) => {
    return (
        <ListItem alignItems="flex-start">
            <Radio
                checked={props.selected}
                onChange={() => props.onSelected(props.roomName)}
                />
            <ListItemText
                primary={props.roomName}
                secondary={
                    <React.Fragment>
                        {`${props.building}`}, 
                        {` Floor ${props.floor}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default MeetingRoomRow;
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const MeetingRoomRow = (props) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={props.roomName}
                secondary={
                    <React.Fragment>
                        {`Building ${props.building}`}
                        {`Floor ${props.floor}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default MeetingRoomRow;
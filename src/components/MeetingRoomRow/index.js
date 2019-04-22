import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const MeetingRoomRow = () => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary="Punjab"
                secondary={
                    <React.Fragment>
                        {'Building 8'}
                        {'Floor 7'}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default MeetingRoomRow;
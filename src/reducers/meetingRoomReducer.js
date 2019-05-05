import {SAVE_ROOM_DATA} from '../actions/actionConstants'; 

const initialState = {
    buildings: [],
    rooms: {},
    meetings: {},
    showAddMeetingDialog: false,
    showSuccessToast: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SAVE_ROOM_DATA:
            return {
                ...state,
                buildings: action.buildings,
                rooms: action.rooms,
                meetings: action.meetings
            };
        default:
            return state;
    }
};
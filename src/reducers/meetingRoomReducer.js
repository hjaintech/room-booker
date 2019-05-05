import {SAVE_ROOM_DATA, HIDE_SHOW_ADD_MEETING_DIALOG, HIDE_SHOW_SUCCESS_TOAST} from '../actions/actionConstants'; 

const initialState = {
    buildings: [],
    rooms: {},
    meetings: {},
    isAddMeetingDialogVisible: false,
    isSuccessToastVisible: false
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
        case HIDE_SHOW_ADD_MEETING_DIALOG: 
            return {
                ...state,
                isAddMeetingDialogVisible: action.isAddMeetingDialogVisible
            };
        case HIDE_SHOW_SUCCESS_TOAST:
            return {
                ...state,
                isSuccessToastVisible: action.isSuccessToastVisible
            };
        default:
            return state;
    }
};
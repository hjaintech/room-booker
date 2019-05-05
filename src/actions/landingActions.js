import {getMeetingData} from '../utils/NetworkUtils';
import {SAVE_ROOM_DATA, HIDE_SHOW_ADD_MEETING_DIALOG, HIDE_SHOW_SUCCESS_TOAST} from './actionConstants';
import {isDateToday, isTimingCurrent} from '../utils/CommonUtils';

export const loadMeetingData = () => {
    const meetingsData = getMeetingData();
    const buildings = meetingsData.data.Buildings;
    let totalRooms = 0;
    let totalMeetingsToday = 0;
    let totalMeetingsGoingOn = 0;
    let totalMeetingRoomsFreeNow = 0;
    buildings.forEach((building) => {
      totalRooms += building.meetingRooms.length;
      building.meetingRooms.forEach((meetingRoom) => {
        let roomFreeRightNow = true;
        meetingRoom.meetings.forEach((meeting) => {
          const isMeetingToday = isDateToday(meeting.date);
          const isMeetingAtCurrentTime = isTimingCurrent(meeting.startTime, meeting.endTime);
          if (isMeetingToday){
            totalMeetingsToday ++;
          }
          if (isMeetingToday && isMeetingAtCurrentTime){
            totalMeetingsGoingOn ++;
            roomFreeRightNow = false;
          }
        });
        if (roomFreeRightNow){
          totalMeetingRoomsFreeNow ++
        }
      });
    });
    return {
      type: SAVE_ROOM_DATA,
      buildings: buildings,
      rooms: {
        total: totalRooms,
        free: totalMeetingRoomsFreeNow
      },
      meetings: {
        total: totalMeetingsToday,
        goingNow: totalMeetingsGoingOn
      },
    };
  }

export const hideAddMeetingDialog = () => {
    return {
        type: HIDE_SHOW_ADD_MEETING_DIALOG,
        isAddMeetingDialogVisible: false
    };
}

export const showAddMeetingDialog = () => {
    return {
        type: HIDE_SHOW_ADD_MEETING_DIALOG,
        isAddMeetingDialogVisible: true
    };
}

export const hideSuccessToast = () => {
    return {
        type: HIDE_SHOW_SUCCESS_TOAST,
        isSuccessToastVisible: false
    };
}

export const showSuccessToast = () => {
    return {
        type: HIDE_SHOW_SUCCESS_TOAST,
        isSuccessToastVisible: true
    };
}

export const closeAddMeetingDialog = (isBookingSuccess) => (dispatch) => {
    dispatch(hideAddMeetingDialog());

    if (isBookingSuccess) {
        dispatch(showSuccessToast());
      setTimeout(() => {
        dispatch(hideSuccessToast());
      }, 4000);
    }
  }
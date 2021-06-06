import { AnyAction, combineReducers } from 'redux';
import * as types from "../types";

export interface IRoom {
    id?: string;
    _id?: string;
    number: string;
}

const room = (state: IRoom, action: AnyAction) => {
    switch (action.type) {
        case types.ADD_ROOM_SUCCESS:
            return state;
        default:
            return null;
    }
};

const rooms = (state: IRoom[] = [], action: AnyAction) => {
    console.log("rooms_reducer", action);
    switch (action.type) {
        case types.GET_ROOMS_SUCCESS:
            if (action.data) return action.data;
            return state;

        case types.ADD_ROOM_SUCCESS:
            return [...state, room(action.data, action)];

        case types.EDIT_ROOM_SUCCESS:
            return state.map((item) => (item._id === action.data._id ? action.data : item));

        case types.DELETE_ROOM_REQUEST:
            return state.filter((item) => item._id !== action.id);
        default:
            return state;
    }
};

const newRoom = (state = "", action: AnyAction) => {
    switch (action.type) {
        case types.ROOM_TYPING:
            return action.newRoom;
        case types.ADD_ROOM_REQUEST:
            return {};
        default:
            return state;
    }
};

const roomReducer = combineReducers({
    rooms,
    newRoom,
});

export default roomReducer;

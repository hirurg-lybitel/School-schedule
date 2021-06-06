import { ThunkDispatch } from 'redux-thunk';
import { IRoom } from '../reducers/rooms';
import * as types from '../types';
import { roomService } from '../services';

interface IError {
    text: string;
    error?: any;
}

export function getRoomsRequest() {
    return {
        type: types.GET_ROOMS_REQUEST,
    };
}

export function editRoomRequest(data: IRoom) {
    return {
        type: types.EDIT_ROOM_REQUEST,
        data: data,
    };
}

export function getRoomsSuccess(data: IRoom[]) {
    return {
        type: types.GET_ROOMS_SUCCESS,
        data: data,
    };
}

export function getRoomsFailure(data: IError) {
    return {
        type: types.GET_ROOMS_FAILURE,
        error: data,
    };
}

function addRoomDuplicate() {
    return {
        type: types.ADD_ROOM_DUPLICATE,
    };
}

function addRoomRequest(data: IRoom) {
    return {
        type: types.ADD_ROOM_REQUEST,
        data: data,
    };
}

function editRoomSuccess(data: IRoom) {
    return {
        type: types.EDIT_ROOM_SUCCESS,
        data: data,
    };
}

function addRoomSuccess(data: IRoom) {
    return {
        type: types.ADD_ROOM_SUCCESS,
        data: data,
    };
}

function addRoomFailure(data: IError) {
    return {
        type: types.ADD_ROOM_FAILURE,
        error: data,
    };
}

function editRoomFailure(data: IError) {
    return {
        type: types.ADD_ROOM_FAILURE,
        error: data,
    };
}

function deleteRoomFailure(data: IError) {
    return {
        type: types.DELETE_ROOM_FAILURE,
        error: data,
    };
}

function destroy(id: string | undefined) {
    return { type: types.DELETE_ROOM_REQUEST, id };
}

export function typing(room: IRoom) {
    return {
        type: types.ROOM_TYPING,
        newRoom: room,
    };
}

export function getRooms() {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch(getRoomsRequest());

        return roomService()
            .getRooms()
            .then((result) => {
                if (result.status === 200) return dispatch(getRoomsSuccess(result.body));
                return dispatch(
                    getRoomsFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
                //return Promise.resolve();
            })
            .catch((error) => {
                dispatch(
                    getRoomsFailure({
                        text: 'Add room error',
                        error: error,
                    }),
                );
                //return Promise.reject(error);
            });
    };
}

export function addRoom(newRoom: IRoom) {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => { room: { rooms: IRoom[] } }) => {
        console.log('action_addRoom', newRoom);

        const number = newRoom.number;

        if (number.trim().length <= 0) return;

        const { room } = getState();
        const data = newRoom;

        /** Если такой объект уже есть в базе, то вернём соответствующее сообщение */
        if (
            room.rooms.filter((item: IRoom) => {
                return item.number === number;
            }).length > 0
        ) {
            return dispatch(addRoomDuplicate());
        }

        dispatch(addRoomRequest(data));

        return roomService()
            .addRoom(data)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(addRoomSuccess(result.body));
                }
                return dispatch(
                    addRoomFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    addRoomFailure({
                        text: 'Add room error',
                        error: err,
                    }),
                );
            });
    };
}

export function editRoom(editRoom: IRoom) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const number = editRoom.number;

        if (number.trim().length <= 0) return;

        dispatch(editRoomRequest(editRoom));

        return roomService()
            .editRoom(editRoom)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(editRoomSuccess(result.body));
                }
                return dispatch(
                    editRoomFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    editRoomFailure({
                        text: 'Add room error',
                        error: err,
                    }),
                );
            });
    };
}

export function deleteRoom(delRoom: IRoom) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const id = delRoom._id;

        return roomService()
            .deleteRoom(delRoom)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(destroy(id));
                }
                return dispatch(
                    deleteRoomFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) =>
                dispatch(
                    deleteRoomFailure({
                        text: 'Add room error',
                        error: err,
                    }),
                ),
            );
    };
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    typing,
    getRooms,
    addRoom,
    editRoom,
    deleteRoom
} from '../actions/room';
import { RootState } from '../reducers';

import WorkArea from '../components/WorkArea';
import { IRoom } from 'src/reducers/rooms';

import { useHistory } from 'react-router-dom';


const Rooms = () => {
    const [edit, setEdit] = React.useState(false);
    const [inputError, setInputError] = React.useState(false);
    const [inputErrorText, setInputErrorText] = React.useState("");
    const [addType, setAddType] = React.useState(0);
    const { rooms, newRoom } = useSelector<RootState, RootState['room']>((state) => state.room);

    const dispatch = useDispatch();
    const dispatchTyping = (data: IRoom) => dispatch(typing(data));
    const dispatchAddRoom = (data: IRoom) => dispatch(addRoom(data));
    const dispatchEditRoom = (data: IRoom) => dispatch(editRoom(data));
    const dispatchDeleteRoom = (data: IRoom) => dispatch(deleteRoom(data));
    const dispatchGetRooms = () => dispatch(getRooms());


    const handleAddClick = () => {
        dispatchTyping({ number: "" } as IRoom);

        setAddType(1);
        setEdit(true);
    };

    const handleEditClick = (object: IRoom) => {
        dispatchTyping(object);

        setAddType(2);
        setEdit(true);
    };

    const handleSaveClick = () => {
        if (!newRoom.number) {
            setInputErrorText("Обязательно для заполнения");
            setInputError(true);
            return;
        }

        switch (addType) {
            case 1:
                dispatchAddRoom(newRoom);
                break;
            case 2:
                dispatchEditRoom(newRoom);
                break;

            default:
                break;
        };

        setEdit(false);
    };

    const handleCancelClick = () => {
        setInputErrorText("");
        setInputError(false);
        setEdit(false);
    };

    useEffect(() => {
        console.log("Rooms_render");

    });

    const handleDeleteClick = (object: IRoom) => {
        dispatchDeleteRoom(object);
        dispatchGetRooms();
    };

    return (
        <WorkArea
            objects={rooms}
            newObject={newRoom}
            onEntryChange={dispatchTyping}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
            edit={edit}
            handleAddClick={handleAddClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            inputError={inputError}
            inputErrorText={inputErrorText}
        />
    );
};

export default Rooms;
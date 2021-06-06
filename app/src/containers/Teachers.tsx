import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typing, getTeachers, addTeacher, editTeacher, deleteTeacher } from '../actions/teacher';
import { RootState } from '../reducers';

import WorkArea from '../components/WorkArea';
import { ITeacher } from 'src/reducers/teachers';

import { useHistory } from 'react-router-dom';

const Teachers = () => {
    const [edit, setEdit] = React.useState(false);
    const [inputError, setInputError] = React.useState(false);
    const [inputErrorText, setInputErrorText] = React.useState("");
    const [addType, setAddType] = React.useState(0);
    const { teachers, newTeacher } = useSelector<RootState, RootState['teacher']>((state) => state.teacher);

    const dispatch = useDispatch();
    const dispatchTyping = (data: ITeacher) => dispatch(typing(data));
    const dispatchAddTeacher = (data: ITeacher) => dispatch(addTeacher(data));
    const dispatchEditTeacher = (data: ITeacher) => dispatch(editTeacher(data));
    const dispatchDeleteTeacher = (data: ITeacher) => dispatch(deleteTeacher(data));
    const dispatchGetTeachers = () => dispatch(getTeachers());

    const handleAddClick = () => {
        dispatchTyping({ name: "" } as ITeacher);

        setAddType(1);
        setEdit(true);
    };

    const handleEditClick = (object: ITeacher) => {
        dispatchTyping(object);

        setAddType(2);
        setEdit(true);
    };

    const handleSaveClick = () => {
        if (!newTeacher.name) {
            setInputErrorText("Обязательно для заполнения");
            setInputError(true);
            return;
        }

        switch (addType) {
            case 1:
                dispatchAddTeacher(newTeacher);
                break;
            case 2:
                dispatchEditTeacher(newTeacher);
                break;

            default:
                break;
        }

        setEdit(false);
    };

    const handleCancelClick = () => {
        setInputErrorText("");
        setInputError(false);
        setEdit(false);
    };

    useEffect(() => {
        console.log("Teachers_render");
    });

    const handleDeleteClick = (object: ITeacher) => {
        dispatchDeleteTeacher(object);
        dispatchGetTeachers();
    };

    return (
        <WorkArea
            objects={teachers}
            newObject={newTeacher}
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

export default Teachers;

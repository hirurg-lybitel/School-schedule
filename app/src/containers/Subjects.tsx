import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typing, getSubjects, addSubject, editSubject, deleteSubject } from '../actions/subject';
import { RootState } from '../reducers';

import WorkArea from '../components/WorkArea';
import { ISubject } from 'src/reducers/subjects';

import { useHistory } from 'react-router-dom';

const Subjects = () => {
    const [edit, setEdit] = React.useState(false);
    const [inputError, setInputError] = React.useState(false);
    const [inputErrorText, setInputErrorText] = React.useState('');
    const [addType, setAddType] = React.useState(0);
    const { subjects, newSubject } = useSelector<RootState, RootState['subject']>((state) => state.subject);

    const dispatch = useDispatch();
    const dispatchTyping = (data: ISubject) => dispatch(typing(data));
    const dispatchAddSubject = (data: ISubject) => dispatch(addSubject(data));
    const dispatchEditSubject = (data: ISubject) => dispatch(editSubject(data));
    const dispatchDeleteSubject = (data: ISubject) => dispatch(deleteSubject(data));
    const dispatchGetSubjects = () => dispatch(getSubjects());

    const handleAddClick = () => {
        dispatchTyping({ name: '' } as ISubject);

        setAddType(1);
        setEdit(true);
        //history.push('/additem');
    };

    const handleEditClick = (subject: ISubject) => {
        dispatchTyping(subject);

        setAddType(2);
        setEdit(true);
    };

    const handleSaveClick = () => {
        if (!newSubject.name) {
            setInputErrorText('Обязательно для заполнения');
            setInputError(true);
            return;
        }

        switch (addType) {
            case 1:
                dispatchAddSubject(newSubject);
                break;
            case 2:
                dispatchEditSubject(newSubject);
                break;

            default:
                break;
        }

        setEdit(false);
    };

    const handleCancelClick = () => {
        setInputErrorText('');
        setInputError(false);
        setEdit(false);
    };

    useEffect(() => {
        console.log('Subjects_render');
    });

    const handleDeleteClick = (subject: ISubject) => {
        dispatchDeleteSubject(subject);
        dispatchGetSubjects();
    };

    console.log('container_Subjects');

    return (
        <WorkArea
            objects={subjects}
            newObject={newSubject}
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

export default Subjects;

import React, { FC, useCallback } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { ISubject } from '../reducers/subjects';
import { ITeacher } from '../reducers/teachers';
import { IRoom } from '../reducers/rooms';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        borderRadius: '6px',
        boxShadow: '0px 1px 4px 0px grey',
    },
    container: {
        margin: theme.spacing(2),
    },
    button: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
}));

interface Props {
    handleSaveClick: () => void;
    handleCancelClick: () => void;
    onEntryChange: (value: ISubject | ITeacher | IRoom) => void;
    object: any;
    inputError: boolean;
    inputErrorText: string;
}

const AddItem: FC<Props> = ({
    object,
    handleCancelClick,
    handleSaveClick,
    onEntryChange,
    inputError,
    inputErrorText,
}) => {
    const classes = useStyles();
    //const defaultValue = object.hasOwnProperty('name') ? object.name : object.number;

    let defaultValue;
    if (object.hasOwnProperty('name')) defaultValue = object.name;
    else defaultValue = object.number;

    function instanceOfRooms(object: any): object is any {
        return 'number' in object;
    }

    const onChange = useCallback((event) => {
        /*if ( object instanceof ISubject)
        console.log("test1", object);
        else
        console.log("test2", object);*/
        console.log('onChange', object);
        if (object.hasOwnProperty('name')) onEntryChange({ ...object, name: event.currentTarget.value });
        else onEntryChange({ ...object, number: event.currentTarget.value });
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <TextField
                    id="input-name"
                    required
                    autoFocus
                    label="Наименование"
                    placeholder="Наименование"
                    defaultValue={defaultValue}
                    error={inputError}
                    helperText={inputErrorText}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </div>
            <div className={classes.container}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveClick}
                >
                    Сохранить
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="default"
                    size="small"
                    onClick={handleCancelClick}
                >
                    Отменить
                </Button>
            </div>
        </div>
    );
};

export default AddItem;

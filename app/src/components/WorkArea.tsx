import React, { FC } from 'react';
import { List, ListItem, ListItemText, Fab, Container, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';

import AddItem from './AddItem';

import { ISubject } from '../reducers/subjects';
import { IRoom } from '../reducers/rooms';
import { ITeacher } from '../reducers/teachers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
        marginRight: theme.spacing(2),
    },
    list: {
        maxHeight: '80%',
        overflow: 'auto',
        marginBottom: theme.spacing(1),
    },
    container: {
        width: '90wh',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: '80vh',
        maxWidth: '100%',
    },
    button: {
        marginLeft: theme.spacing(2),
    },
}));

interface Props {
    objects: ISubject[] | ITeacher[] | IRoom[];
    newObject: ISubject | ITeacher | IRoom;
    edit: boolean;
    onEntryChange: (value: any) => void;
    handleSaveClick: () => void;
    handleCancelClick: () => void;
    handleAddClick: (value: ISubject | IRoom | ITeacher) => void;
    handleEditClick: (value: any) => void;
    handleDeleteClick: (value: any) => void;
    inputError: boolean;
    inputErrorText: string;
}

const WorkArea: FC<Props> = ({
    objects,
    newObject,
    edit,
    onEntryChange,
    handleSaveClick,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCancelClick,
    inputError,
    inputErrorText,
}) => {
    const classes = useStyles();

    const objectItems = objects.map((item, key) => {
        const text = item.hasOwnProperty('name') ? item.name : item.number;
        return (
            <div>
                <ListItem key={key}>
                    <ListItemText primary={text} />
                    <Fab
                        className={classes.margin}
                        size="small"
                        color="primary"
                        onClick={(event) => handleEditClick(item)}
                    >
                        <EditIcon />
                    </Fab>
                    <Fab
                        className={classes.margin}
                        size="small"
                        color="secondary"
                        onClick={(event) => handleDeleteClick(item)}
                    >
                        <DeleteIcon />
                    </Fab>
                </ListItem>
                <Divider variant="middle" />
            </div>
        );
    });

    let Elements;

    switch (edit) {
        case true:
            Elements = () => {
                return (
                    <Container className={classes.container}>
                        <AddItem
                            object={newObject}
                            onEntryChange={onEntryChange}
                            handleSaveClick={handleSaveClick}
                            handleCancelClick={handleCancelClick}
                            inputError={inputError}
                            inputErrorText={inputErrorText}
                        />
                    </Container>
                );
            };

            break;
        case false:
            Elements = () => {
                return (
                    <Container className={classes.container}>
                        <List className={classes.list}>{objectItems}</List>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddClick}
                        >
                            Добавить
                        </Button>
                    </Container>
                );
            };
            break;
    }

    return <Elements />;
};

export default WorkArea;

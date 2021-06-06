import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Dialog, makeStyles, Typography, IconButton, TextField, Divider,
} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { RootState } from '../reducers';

import { IRoom } from 'src/reducers/rooms';
import { ITeacher } from 'src/reducers/teachers';
import { ISubject } from 'src/reducers/subjects';
import { IDashboard } from '../reducers/dashboard';

import { typing } from '../actions/dashboard';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: '400px',
        width: '25vw',
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dateTime: {
        paddingBottom: theme.spacing(2),
    },
    combobox: {
        paddingBottom: theme.spacing(2),
    },
    textDate: {
        marginLeft: theme.spacing(1),
        width: 150,
    },
    textTime: {
        position: "absolute",
        right: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    deleteIcon: {
        //position: "absolute",
        //left: theme.spacing(1),
    },
    divider: {
        marginRight: theme.spacing(2),
    }
}),
);


export interface DialogTitleProps {
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = ((props: DialogTitleProps) => {
    const { children, onClose } = props;
    const classes = useStyles();
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
}))(MuiDialogActions);



export interface CustomizedDialogProps {
    objects?: Array<any>;
    edit: boolean;
    handleCloseClick: () => void;
    handleDeleteClick: () => void;
    handleSaveClick: () => void;
}

export default function CustomizedDialog(props: CustomizedDialogProps) {
    const { edit } = props;

    if (!edit) return (<div></div>);

    const { handleCloseClick, handleDeleteClick, handleSaveClick } = props;

    const { newDashboard } = useSelector<RootState, RootState['dashboard']>((state) => state.dashboard);
    const { rooms } = useSelector<RootState, RootState['room']>((state) => state.room);
    const { teachers } = useSelector<RootState, RootState['teacher']>((state) => state.teacher);
    const { subjects } = useSelector<RootState, RootState['subject']>((state) => state.subject);

    const dispatch = useDispatch();
    const dispatchTyping = (data: IDashboard) => dispatch(typing(data));

    const classes = useStyles();

    const handleDateChange = (event) => {
        const dateOnChange = new Date(event.target.value);
        const year = dateOnChange.getFullYear();
        const month = dateOnChange.getMonth();
        const day = dateOnChange.getDate();

        const date = new Date(newDashboard.date);
        const hours = date.getHours() || 8;
        const minutes = date.getMinutes() || 0;

        console.log("year", year);
        console.log("month", month);
        console.log("day", day);
        console.log("hours", hours);
        console.log("minutes", minutes);

        const newDate = new Date(year, month, day, hours, minutes);

        const newObject: IDashboard = { ...newDashboard, date: newDate };

        dispatchTyping(newObject);
    };

    const handleTimeChange = (event) => {
        const date = new Date(newDashboard.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const timeOnChange = event.target.value.split(":");
        const hours = timeOnChange[0];
        const minutes = timeOnChange[1];

        console.log("year", year);
        console.log("month", month);
        console.log("day", day);
        console.log("hours", hours);
        console.log("minutes", minutes);

        const newDate = new Date(year, month, day, hours, minutes);

        const newObject: IDashboard = { ...newDashboard, date: newDate };

        dispatchTyping(newObject);
    };

    const handleRoomChange = (event, newValue: IRoom | null) => {
        const newObject: IDashboard = { ...newDashboard, roomId: newValue };

        dispatchTyping(newObject);
    };
    const handleTeacherChange = (event, newValue: ITeacher | null) => {
        const newObject: IDashboard = { ...newDashboard, teacherId: newValue };

        dispatchTyping(newObject);
    };
    const handleSubjectChange = (event, newValue: ISubject | null) => {
        const newObject: IDashboard = { ...newDashboard, subjectId: newValue };

        dispatchTyping(newObject);
    };


    let dateValue = "", timeValue = "";
    const checkDate: Date | undefined = newDashboard.date;
    if (checkDate !== undefined) {
        const date = new Date(newDashboard.date);

        const year = ("0" + date.getFullYear()).slice(-4);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        dateValue = year + "-" + month + "-" + day;

        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        timeValue = hours + ":" + minutes;
    } else {
        const date = new Date();
        const year = ("0" + date.getFullYear()).slice(-4);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        dateValue = year + "-" + month + "-" + day;

        timeValue = "08:00";
    }

    console.log("newDashboard", newDashboard);

    return (
        <div>
            <Dialog
                open={edit}>
                <DialogTitle onClose={handleCloseClick}>
                    Редактирование карточки
                </DialogTitle>
                <DialogContent dividers >
                    <Autocomplete
                        className={classes.combobox}
                        options={rooms}
                        value={newDashboard.roomId ? newDashboard.roomId : null}
                        getOptionLabel={(option: IRoom) => {
                            return option.number ? option.number : "";
                        }}
                        getOptionSelected={(option: IRoom) => {
                            return option._id === (newDashboard.roomId ? newDashboard.roomId._id : option._id)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Учебный класс" variant="outlined" />
                        )}
                        onChange={handleRoomChange}
                    />
                    <div className={classes.dateTime}>
                        <TextField
                            id="date"
                            label="Дата"
                            type="date"
                            defaultValue={dateValue}
                            className={classes.textDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleDateChange}
                        />
                        <TextField
                            id="time"
                            label="Время"
                            type="time"
                            defaultValue={timeValue}
                            className={classes.textTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={handleTimeChange}
                        />

                    </div>

                    <Autocomplete
                        className={classes.combobox}
                        options={teachers}
                        //defaultValue={newDashboard.teacherId ? newDashboard.teacherId : null}
                        value={newDashboard.teacherId ? newDashboard.teacherId : null}
                        getOptionLabel={(option: ITeacher) => {
                            return option.name ? option.name : "";
                        }}
                        getOptionSelected={(option: ITeacher) => {
                            return option._id === (newDashboard.teacherId ? newDashboard.teacherId._id : option._id)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Учитель" variant="outlined" />
                        )}
                        onChange={handleTeacherChange}
                    />
                    <Autocomplete
                        className={classes.combobox}
                        options={subjects}
                        //defaultValue={newDashboard.subjectId}
                        value={newDashboard.subjectId ? newDashboard.subjectId : null}
                        getOptionLabel={(option: ISubject) => {
                            return option.name ? option.name : "";
                        }}
                        getOptionSelected={(option: ISubject) => {
                            return option._id === (newDashboard.subjectId ? newDashboard.subjectId._id : option._id)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Предмет" variant="outlined" />
                        )}
                        onChange={handleSubjectChange}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton
                        onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" flexItem />
                    <Button
                        variant="contained"
                        onClick={handleSaveClick}
                        color="primary"
                        size="small">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );

};
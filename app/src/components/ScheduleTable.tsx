import React, { useEffect, FC } from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Container,
    Paper,
    Button,
    IconButton,
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import CustomizedDialog from "./CustomizedDialog";

import { ISubject } from '../reducers/subjects';
import { ITeacher } from '../reducers/teachers';
import { IRoom } from '../reducers/rooms';
import { IDashboard } from '../reducers/dashboard';

import { getRooms } from '../actions/room';
import { getSubjects } from '../actions/subject';
import { getTeachers } from '../actions/teacher';
import { typing, addDashboard, editDashboard, deleteDashboard } from '../actions/dashboard';

import { RootState } from '../reducers';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
        maxHeight: '50vh',
        overflow: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        backgroundColor: '#4caf50',
        marginTop: theme.spacing(1),
        borderRadius: '6px',
        boxShadow: "0px 1px 4px 0px grey",
        padding: theme.spacing(1),
        minWidth: '250px',
        maxWidth: '250px',
    },
    cell: {
        borderRightStyle: "solid",
        borderRightColor: "gray",
        borderWidth: "20",
        borderRightWidth: '1px',
    },
    tableContainer: {
        overflow: 'auto',
        maxHeight: '100%',
        borderRadius: '6px',
        boxShadow: "0px 1px 4px grey",
    },
    cardLine: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    headerCell: {
        color: 'white',
        backgroundColor: 'gray',
        fontSize: '15pt',
    },
    timeCell: {
        verticalAlign: 'top',
        textAlign: 'center',
        borderRightWidth: '1px',
        borderRightStyle: "solid",
        borderRightColor: "gray",
        fontSize: '12pt',
        backgroundColor: 'white',
    },
    sticky: {
        position: "sticky",
        left: 0,
    },
    div: {
        height: 'inherit',
        maxHeight: '100%',
    },
    skipIcon: {
        //borderWidth: "1px",
        //borderStyle: "solid",
        //borderColor: "#d3d3d3",
        //borderColor: "gray",
        //border: "4mm ridge black",
        borderRadius: '6px',
        //boxShadow: "0px 1px 4px grey",
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
    },
    skipPreviousIcon: {
        position: "relative",
        float: "left",
    },
    skipNextIcon: {
        position: "relative",
        float: "right",
    },
    addIcon: {},
    divButton: {
        textAlign: "center",
    },
}));

interface Props {
    objects: IDashboard[];
}

const SchedulteTable: FC<Props> = ({ objects }) => {
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false);
    const [addType, setAddType] = React.useState(0);
    const [onDate, setOnDate] = React.useState(new Date());

    console.log("OnDate", onDate);

    const { newDashboard } = useSelector<RootState, RootState['dashboard']>((state) => state.dashboard);

    const dispatch = useDispatch();
    const dispatchTyping = (data: IDashboard) => dispatch(typing(data));
    const dispatchAddCard = (data: IDashboard) => dispatch(addDashboard(data));
    const dispatchEditCard = (data: IDashboard) => dispatch(editDashboard(data));
    const dispatchDeleteCard = (data: IDashboard) => dispatch(deleteDashboard(data));
    const dispathGetRooms = () => dispatch(getRooms());
    const dispathGetTeachers = () => dispatch(getSubjects());
    const dispathGetRSubjects = () => dispatch(getTeachers());

    const handleCardClick = (object: IDashboard) => {
        console.log("handleCardClick", object);

        dispatchTyping(object);

        dispathGetRooms();
        dispathGetTeachers();
        dispathGetRSubjects();

        setAddType(2);
        setEdit(true);
    };

    const handleDialogCloseClick = () => {
        setEdit(false);
    };

    const handleDialogDeleteClick = () => {
        console.log("handleDialogDeleteClick", newDashboard);
        dispatchDeleteCard(newDashboard);
        setEdit(false);
    };

    const handleDialogSaveClick = () => {
        switch (addType) {
            case 1:
                dispatchAddCard(newDashboard);
                break;
            case 2:
                dispatchEditCard(newDashboard);
                break;

            default:
                break;
        }

        setEdit(false);
    };

    const handelNewCard = () => {
        console.log("handelNewCard", newDashboard);

        dispatchTyping({} as IDashboard);

        dispathGetRooms();
        dispathGetTeachers();
        dispathGetRSubjects();

        setAddType(1);
        setEdit(true);
    };

    const handleSkipPreviousClick = () => {
        console.log("handleSkipPreviousClick", onDate);
        setOnDate(new Date(onDate.setDate(onDate.getDate() - 7)));
    };

    const handleSkipNextClick = () => {
        console.log("handleSkipNextClick", onDate);
        setOnDate(new Date(onDate.setDate(onDate.getDate() + 7)));
    };

    /** Массив времени */
    let hourArray = [];
    for (let index = 8; index <= 22; index++) {
        hourArray.push(new Date(0, 0, 0, index, 0, 0));
    }

    /** Чтобы не строился грид без данных */
    if (objects.length == 0) hourArray = [];

    const daysArray = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const currDate = new Date(onDate);
    const numberOfDaysToAdd = 0;
    currDate.setDate(currDate.getDate() + numberOfDaysToAdd);

    /** Получаем первый и последний день текущей недели */
    const firstday = new Date(
        currDate.setDate(currDate.getDate() - (currDate.getDay() === 0 ? 6 : currDate.getDate())),
    );
    console.log("firstday", firstday);
    const lastday = new Date(currDate.setDate(firstday.getDate() + 6));

    let currentDay, day: string, month;
    const dateArray = [];
    const currentDate = new Date(firstday);
    while (currentDate <= lastday) {
        currentDay = currentDate.getDate();

        /** Отображение двух знаков */
        day = ("0" + currentDay).slice(-2);

        month = currentDate.getMonth() + 1;
        month = ("0" + month).slice(-2);

        /** Формируем шапку */
        dateArray.push({
            id: daysArray[currentDate.getDay()],
            date: currentDay,
            label: daysArray[currentDate.getDay()],
            dateString: day + '.' + month,
            minWidth: 150,
            maxWidth: 250,
            align: 'center',
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    const dataArray = [];
    for (let i = 0; i < hourArray.length; i++) {
        const row: IDashboard[][] = [];
        for (let j = 0; j < dateArray.length; j++) {
            const currentDate = dateArray[j].date;

            row.push(
                objects.filter((element) => {
                    const elementDate = new Date(moment(element.date).format());
                    const elementDay = elementDate.getDate();
                    const elementTime = elementDate.getHours();
                    const itemTime = hourArray[i].getHours();

                    return elementTime === itemTime && currentDate === elementDay;
                }),
            );
        }

        dataArray.push(row);
    }

    console.log("OnDate_2", currentDay);
    return (
        <div className={classes.div}>
            <div className={classes.divButton}>
                <Button
                    variant="contained"
                    color="default"
                    className={clsx(classes.skipPreviousIcon, classes.skipIcon)}
                    onClick={handleSkipPreviousClick}
                >
                    <SkipPreviousIcon fontSize="large" />
                    Week - 1
                </Button>

                <Button
                    variant="contained"
                    color="default"
                    className={clsx(classes.addIcon, classes.skipIcon)}
                    onClick={handelNewCard}
                >
                    <NoteAddOutlinedIcon fontSize="large" />
                    Добавить карточку
                </Button>

                <Button
                    variant="contained"
                    color="default"
                    className={clsx(classes.skipNextIcon, classes.skipIcon)}
                    onClick={handleSkipNextClick}
                >
                    Week + 1
                    <SkipNextIcon fontSize="large" />
                </Button>
            </div>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.sticky} scope="row"></TableCell>
                            {dateArray.map((column, i) => (
                                <TableCell
                                    key={i}
                                    align={column.align}
                                    className={classes.headerCell}
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    <div>{column.label}</div>
                                    <div>{column.dateString}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataArray.map((row, i) => {
                            const value =
                                ("0" + hourArray[i].getHours()).slice(-2) +
                                ":" +
                                ("0" + hourArray[i].getMinutes()).slice(-2);
                            return (
                                <TableRow key={i}>
                                    <TableCell
                                        className={clsx(classes.sticky, classes.timeCell)}
                                        scope="row"
                                        component="th"
                                    >
                                        {value}
                                    </TableCell>
                                    {row.map((column: IDashboard[]) => {
                                        let date: Date,
                                            time = "",
                                            room = "",
                                            subject = "",
                                            teacher = "";

                                        if (!(column.length > 0)) {
                                            return <TableCell />;
                                        }

                                        return (
                                            <TableCell>
                                                {column.map((cell: IDashboard) => {
                                                    date = new Date(cell.date);
                                                    time =
                                                        ("0" + date.getHours()).slice(-2) +
                                                        ":" +
                                                        ("0" + date.getMinutes()).slice(-2);
                                                    room = cell.roomId ? cell.roomId.number : ""; //cell.roomId.number || "test";
                                                    subject = cell.subjectId ? cell.subjectId.name : ""; //cell.subjectId.name;
                                                    teacher = cell.teacherId ? cell.teacherId.name : ""; //cell.teacherId.name;

                                                    return (
                                                        <Container
                                                            key={cell._id}
                                                            className={classes.container}
                                                            onClick={() => handleCardClick(cell)}
                                                        >
                                                            <div
                                                                className={classes.cardLine}
                                                                style={{ fontWeight: "bold" }}
                                                            >
                                                                Класс №{room}
                                                            </div>
                                                            <div className={classes.cardLine}>{time}</div>
                                                            <div className={classes.cardLine}>{subject}</div>
                                                            <div className={classes.cardLine}>{teacher}</div>
                                                        </Container>
                                                    );
                                                })}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomizedDialog
                objects={objects}
                edit={edit}
                handleCloseClick={handleDialogCloseClick}
                handleDeleteClick={handleDialogDeleteClick}
                handleSaveClick={handleDialogSaveClick}
            />
        </div>
    );
};

export default SchedulteTable;

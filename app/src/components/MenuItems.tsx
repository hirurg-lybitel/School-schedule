import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleIcon from '@material-ui/icons/People';
import SubjectIcon from '@material-ui/icons/Subject';

import { getSubjects } from "../actions/subject";
import { getTeachers } from "../actions/teacher";
import { getRooms } from "../actions/room";
import { getDashboard } from '../actions/dashboard';


const MenuItems = (props) => {
    const { handleChageTitle } = props

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDashboardClick = () => {
        handleChageTitle("Расписание");
        dispatch(getDashboard());
        history.push('/dashboard');
    };
    const handleSubjectClick = () => {
        handleChageTitle("Предметы");
        dispatch(getSubjects());
        history.push('/subjects');
    };
    const handleTeacherClick = () => {
        handleChageTitle("Учителя");
        dispatch(getTeachers());
        history.push('/teachers');
    };
    const handleRoomClick = () => {
        handleChageTitle("Учебные классы");
        dispatch(getRooms());
        history.push('/rooms');
    };

    return (
        <div>
            <ListItem
                key="0"
                button
                onClick={handleDashboardClick}
            >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Расписание" />
            </ListItem>
            <ListItem
                key="1"
                button
                onClick={handleSubjectClick}
            >
                <ListItemIcon>
                    <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary="Предметы" />
            </ListItem>
            <ListItem
                key="2"
                button
                onClick={handleTeacherClick}
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Учителя" />
            </ListItem>
            <ListItem
                key="3"
                button
                onClick={handleRoomClick}
            >
                <ListItemIcon>
                    <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Классы" />
            </ListItem>
        </div>
    );
};

export default MenuItems;
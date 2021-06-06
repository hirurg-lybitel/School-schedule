import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';

import subject, { ISubject } from './subjects';
import room, { IRoom } from './rooms';
import teacher, { ITeacher } from './teachers';
import dashboard, { IDashboard } from './dashboard';

const createRootReducer = (history: History) =>
    combineReducers({
        subject,
        teacher,
        room,
        dashboard,
        router: connectRouter(history),
    });

export interface RootState {
    subject: {
        subjects: ISubject[];
        newSubject: ISubject;
    };
    room: {
        rooms: IRoom[];
        newRoom: IRoom;
    };
    teacher: {
        teachers: ITeacher[];
        newTeacher: ITeacher;
    };
    dashboard: {
        dashboards: IDashboard[];
        newDashboard: IDashboard;
    };
    router: Reducer<RouterState>;
}

export default createRootReducer;

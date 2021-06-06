import { AnyAction, combineReducers } from 'redux';
import * as types from "../types";
import { ISubject } from './subjects';
import { IRoom } from './rooms';
import { ITeacher } from './teachers';

export interface IDashboard {
    _id?: string;
    date: Date;
    roomId: IRoom | null;
    teacherId: ITeacher | null;
    subjectId: ISubject | null;
}

const dashboard = (state: IDashboard, action: AnyAction) => {
    switch (action.type) {
        case types.ADD_DASHBOARD_SUCCESS:
            return state;
        default:
            return null;
    }
};

const dashboards = (state: IDashboard[] = [], action: AnyAction) => {
    switch (action.type) {
        case types.GET_DASHBOARDS_SUCCESS:
            if (action.data) return action.data;
            return state;

        case types.ADD_DASHBOARD_SUCCESS:
            console.log("ADD_DASHBOARD_SUCCESS", action);
            console.log("ADD_DASHBOARD_SUCCESS_state", state);
            console.log("ADD_DASHBOARD_SUCCESS_state_map", dashboard(action.data, action));
            return [...state, dashboard(action.data, action)];

        case types.EDIT_DASHBOARD_SUCCESS:
            return state.map((item) => item._id === action.data._id ? action.data : item);

        case types.DELETE_DASHBOARD_SUCCESS:
            return state.filter((item) => item._id !== action.id);
        default:
            return state;
    }
};

const newDashboard = (
    state = '',
    action: AnyAction
) => {
    switch (action.type) {
        case types.DASHBOARD_TYPING:
            return action.newDashboard;
        case types.ADD_DASHBOARD_REQUEST:
            return {};
        default:
            return state;
    }
};

const dashboardReducer = combineReducers({
    dashboards,
    newDashboard
});

export default dashboardReducer;
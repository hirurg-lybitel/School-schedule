import { ThunkDispatch } from 'redux-thunk';
import { IDashboard } from '../reducers/dashboard';
import * as types from "../types";
import { dashboardervice } from '../services';

interface IError {
    text: string;
    error?: any;
}

export function typing(object: IDashboard) {
    return {
        type: types.DASHBOARD_TYPING,
        newDashboard: object,
    };
}

function getDashboardRequest() {
    return {
        type: types.GET_DASHBOARDS_REQUEST,
    };
}
function getDashboardSuccess(object: IDashboard) {
    return {
        type: types.GET_DASHBOARDS_SUCCESS,
        data: object,
    };
}
function getDashboardFailure(error: IError) {
    return {
        type: types.GET_DASHBOARDS_FAILURE,
        data: error,
    };
}
export function getDashboard() {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch(getDashboardRequest());

        return dashboardervice()
            .getDashboards()
            .then((result) => {
                console.log("getDashboard", result.body);
                if (result.status === 200) return dispatch(getDashboardSuccess(result.body));
                return dispatch(
                    getDashboardFailure({
                        text: "Status from server " + result.status,
                    }),
                );
                //return Promise.resolve();
            })
            .catch((error) => {
                dispatch(
                    getDashboardFailure({
                        text: "Add teacher error",
                        error: error,
                    }),
                );
                //return Promise.reject(error);
            });
    };
}

function addDashboardRequest(object: IDashboard) {
    return {
        type: types.ADD_DASHBOARD_REQUEST,
        data: object,
    };
}
function addDashboardSuccess(object: IDashboard) {
    return {
        type: types.ADD_DASHBOARD_SUCCESS,
        data: object,
    };
}
function addDashboardFailure(error: IError) {
    return {
        type: types.ADD_DASHBOARD_FAILURE,
        data: error,
    };
}
export function addDashboard(newObject: IDashboard) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const data = newObject;

        dispatch(addDashboardRequest(data));

        return dashboardervice()
            .addDashboard(data)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(addDashboardSuccess(result.body));
                }
                return dispatch(
                    addDashboardFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    addDashboardFailure({
                        text: "Add dashboard error",
                        error: err,
                    }),
                );
            });
    };
}

function editDashboardRequest(object: IDashboard) {
    return {
        type: types.EDIT_DASHBOARD_REQUEST,
        data: object,
    };
}
function editDashboardSuccess(object: IDashboard) {
    return {
        type: types.EDIT_DASHBOARD_SUCCESS,
        data: object,
    };
}
function editDashboardFailure(error: IError) {
    return {
        type: types.EDIT_DASHBOARD_FAILURE,
        data: error,
    };
}
export function editDashboard(newObject: IDashboard) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const data = newObject;

        dispatch(editDashboardRequest(data));

        return dashboardervice()
            .editDashboard(data)
            .then((result) => {
                if (result.status === 200) {
                    console.log("editDashboard", result.body);
                    return dispatch(editDashboardSuccess(result.body));
                }
                return dispatch(
                    editDashboardFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    editDashboardFailure({
                        text: "Edit dashboard error",
                        error: err,
                    }),
                );
            });
    };
}

function deleteDashboardRequest(object: IDashboard) {
    return {
        type: types.DELETE_DASHBOARD_REQUEST,
        data: object,
    };
}
function deleteDashboardSuccess(id: string | undefined) {
    return {
        type: types.DELETE_DASHBOARD_SUCCESS,
        id,
    };
}
function deleteDashboardFailure(error: IError) {
    return {
        type: types.DELETE_DASHBOARD_FAILURE,
        data: error,
    };
}
export function deleteDashboard(delObject: IDashboard) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const id = delObject._id;

        dispatch(deleteDashboardRequest(delObject));

        return dashboardervice()
            .deleteDashboard(delObject)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(deleteDashboardSuccess(id));
                }
                return dispatch(
                    deleteDashboardFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) =>
                dispatch(
                    deleteDashboardFailure({
                        text: "Add subject error",
                        error: err,
                    }),
                ),
            );
    };
}

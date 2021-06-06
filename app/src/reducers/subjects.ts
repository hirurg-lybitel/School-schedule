import { AnyAction, combineReducers } from 'redux';
import * as types from "../types";

export interface ISubject {
    id?: string;
    _id?: string;
    name: string;
}

const subject = (state: ISubject, action: AnyAction) => {
    console.log("reducer_subject_1", state);

    switch (action.type) {
        case types.ADD_SUBJECT_SUCCESS:
            return state;
        default:
            return null;
    }
};

const subjects = (state: ISubject[] = [], action: AnyAction) => {
    switch (action.type) {
        case types.GET_SUBJECTS_SUCCESS:
            if (action.data) return action.data;
            return state;

        case types.ADD_SUBJECT_SUCCESS:
            return [...state, subject(action.data, action)];

        case types.EDIT_SUBJECT_SUCCESS:
            return state.map((item) => (item._id === action.data._id ? action.data : item));

        case types.DELETE_SUBJECT_REQUEST:
            return state.filter((item) => item._id !== action.id);
        default:
            return state;
    }
};

const newSubject = (state = "", action: AnyAction) => {
    switch (action.type) {
        case types.SUBJECT_TYPING:
            return action.newSubject;
        case types.ADD_SUBJECT_REQUEST:
            return {};
        default:
            return state;
    }
};

const subjectReducer = combineReducers({
    subjects,
    newSubject,
});

export default subjectReducer;

import { AnyAction, combineReducers } from 'redux';
import * as types from "../types";

export interface ITeacher {
    id?: string
    _id?: string
    name: string
}

const teacher = (state: ITeacher, action: AnyAction) => {
    switch (action.type) {
        case types.ADD_TEACHER_SUCCESS:
            return state;
        default:
            return null;
    }
};

const teachers = (state: ITeacher[] = [], action: AnyAction) => {
    switch (action.type) {
        case types.GET_TEACHERS_SUCCESS:
            if (action.data) return action.data;
            return state;

        case types.ADD_TEACHER_SUCCESS:
            return [...state, teacher(action.data, action)];

        case types.EDIT_TEACHER_SUCCESS:
            return state.map((item) => item._id === action.data._id ? action.data : item);

        case types.DELETE_TEACHER_REQUEST:
            return state.filter((item) => item._id !== action.id);
        default:
            return state;
    }
};

const newTeacher = (
    state = '',
    action: AnyAction
) => {
    switch (action.type) {
        case types.TEACHER_TYPING:
            return action.newTeacher;
        case types.ADD_TEACHER_REQUEST:
            return {};
        default:
            return state;
    }
};


const teacherReducer = combineReducers({
    teachers,
    newTeacher
});


export default teacherReducer;
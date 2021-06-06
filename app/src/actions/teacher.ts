import { ThunkDispatch } from 'redux-thunk';
import { ITeacher } from '../reducers/teachers';
import * as types from '../types';
import { teacherService } from '../services';

interface IError {
    text: string;
    error?: any;
}

export function getTeachersRequest() {
    return {
        type: types.GET_TEACHERS_REQUEST,
    };
}

export function editTeacherRequest(data: ITeacher) {
    return {
        type: types.EDIT_TEACHER_REQUEST,
        data: data,
    };
}

export function getTeachersSuccess(data: ITeacher[]) {
    return {
        type: types.GET_TEACHERS_SUCCESS,
        data: data,
    };
}

export function getTeachersFailure(data: IError) {
    return {
        type: types.GET_TEACHERS_FAILURE,
        error: data,
    };
}

function addTeacherDuplicate() {
    return {
        type: types.ADD_TEACHER_DUPLICATE,
    };
}

function addTeacherRequest(data: ITeacher) {
    return {
        type: types.ADD_TEACHER_REQUEST,
        data: data,
    };
}

function editTeacherSuccess(data: ITeacher) {
    return {
        type: types.EDIT_TEACHER_SUCCESS,
        data: data,
    };
}

function addTeacherSuccess(data: ITeacher) {
    return {
        type: types.ADD_TEACHER_SUCCESS,
        data: data,
    };
}

function addTeacherFailure(data: IError) {
    return {
        type: types.ADD_TEACHER_FAILURE,
        error: data,
    };
}

function editTeacherFailure(data: IError) {
    return {
        type: types.ADD_TEACHER_FAILURE,
        error: data,
    };
}

function deleteTeacherFailure(data: IError) {
    return {
        type: types.DELETE_TEACHER_FAILURE,
        error: data,
    };
}

function destroy(id: string | undefined) {
    return { type: types.DELETE_TEACHER_REQUEST, id };
}

export function typing(teacher: ITeacher) {
    return {
        type: types.TEACHER_TYPING,
        newTeacher: teacher,
    };
}

export function getTeachers() {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch(getTeachersRequest());

        return teacherService()
            .getTeachers()
            .then((result) => {
                if (result.status === 200) return dispatch(getTeachersSuccess(result.body));
                return dispatch(
                    getTeachersFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
                //return Promise.resolve();
            })
            .catch((error) => {
                dispatch(
                    getTeachersFailure({
                        text: 'Add teacher error',
                        error: error,
                    }),
                );
                //return Promise.reject(error);
            });
    };
}

export function addTeacher(newTeacher: ITeacher) {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => { teacher: { teachers: ITeacher[] } }) => {
        console.log('action_addTeacher', newTeacher);

        const name = newTeacher.name;

        if (name.trim().length <= 0) return;

        const { teacher } = getState();
        const data = newTeacher;

        /** Если такой объект уже есть в базе, то вернём соответствующее сообщение */
        if (
            teacher.teachers.filter((item: ITeacher) => {
                return item.name === name;
            }).length > 0
        ) {
            return dispatch(addTeacherDuplicate());
        }

        dispatch(addTeacherRequest(data));

        return teacherService()
            .addTeacher(data)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(addTeacherSuccess(result.body));
                }
                return dispatch(
                    addTeacherFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    addTeacherFailure({
                        text: 'Add teacher error',
                        error: err,
                    }),
                );
            });
    };
}

export function editTeacher(editTeacher: ITeacher) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const name = editTeacher.name;

        if (name.trim().length <= 0) return;

        dispatch(editTeacherRequest(editTeacher));

        return teacherService()
            .editTeacher(editTeacher)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(editTeacherSuccess(result.body));
                }
                return dispatch(
                    editTeacherFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    editTeacherFailure({
                        text: 'Add teacher error',
                        error: err,
                    }),
                );
            });
    };
}

export function deleteTeacher(delTeacher: ITeacher) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const id = delTeacher._id;

        return teacherService()
            .deleteTeacher(delTeacher)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(destroy(id));
                }
                return dispatch(
                    deleteTeacherFailure({
                        text: 'Status from server ' + result.status,
                    }),
                );
            })
            .catch((err) =>
                dispatch(
                    deleteTeacherFailure({
                        text: 'Add teacher error',
                        error: err,
                    }),
                ),
            );
    };
}

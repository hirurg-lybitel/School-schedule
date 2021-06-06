import { ThunkDispatch } from 'redux-thunk';
import { ISubject } from '../reducers/subjects';
import * as types from "../types";
import { subjectService } from '../services';

interface IError {
    text: string;
    error?: any;
}

export function getSubjectsRequest() {
    return {
        type: types.GET_SUBJECTS_REQUEST,
    };
}

export function editSubjectRequest(data: ISubject) {
    return {
        type: types.EDIT_SUBJECT_REQUEST,
        data: data,
    };
}

export function getSubjectsSuccess(data: ISubject[]) {
    return {
        type: types.GET_SUBJECTS_SUCCESS,
        data: data,
    };
}

export function getSubjectsFailure(data: IError) {
    return {
        type: types.GET_SUBJECTS_FAILURE,
        error: data,
    };
}

function addSubjectDuplicate() {
    return {
        type: types.ADD_SUBJECT_DUPLICATE,
    };
}

function addSubjectRequest(data: ISubject) {
    return {
        type: types.ADD_SUBJECT_REQUEST,
        data: data,
    };
}

function editSubjectSuccess(data: ISubject) {
    return {
        type: types.EDIT_SUBJECT_SUCCESS,
        data: data,
    };
}

function addSubjectSuccess(data: ISubject) {
    return {
        type: types.ADD_SUBJECT_SUCCESS,
        data: data,
    };
}

function addSubjectFailure(data: IError) {
    return {
        type: types.ADD_SUBJECT_FAILURE,
        error: data,
    };
}

function editSubjectFailure(data: IError) {
    return {
        type: types.ADD_SUBJECT_FAILURE,
        error: data,
    };
}

function deleteSubjectFailure(data: IError) {
    return {
        type: types.DELETE_SUBJECT_FAILURE,
        error: data,
    };
}

function destroy(id: string | undefined) {
    return { type: types.DELETE_SUBJECT_REQUEST, id };
}

export function typing(subject: ISubject) {
    return {
        type: types.SUBJECT_TYPING,
        newSubject: subject,
    };
}

export function getSubjects() {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        dispatch(getSubjectsRequest());

        return subjectService()
            .getSubjects()
            .then((result) => {
                if (result.status === 200) return dispatch(getSubjectsSuccess(result.body));
                return dispatch(
                    getSubjectsFailure({
                        text: "Status from server " + result.status,
                    }),
                );
                //return Promise.resolve();
            })
            .catch((error) => {
                dispatch(
                    getSubjectsFailure({
                        text: "Add subject error",
                        error: error,
                    }),
                );
                //return Promise.reject(error);
            });
    };
}

export function addSubject(newSubject: ISubject) {
    return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => { subject: { subjects: ISubject[] } }) => {
        const name = newSubject.name;

        if (name.trim().length <= 0) return;

        const { subject } = getState();
        const data = newSubject;

        /** Если такой объект уже есть в базе, то вернём соответствующее сообщение */
        if (
            subject.subjects.filter((item: ISubject) => {
                return item.name === name;
            }).length > 0
        ) {
            return dispatch(addSubjectDuplicate());
        }

        dispatch(addSubjectRequest(data));

        return subjectService()
            .addSubject(data)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(addSubjectSuccess(result.body));
                }
                return dispatch(
                    addSubjectFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    addSubjectFailure({
                        text: "Add subject error",
                        error: err,
                    }),
                );
            });
    };
}

export function editSubject(editSubject: ISubject) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const name = editSubject.name;

        if (name.trim().length <= 0) return;

        dispatch(editSubjectRequest(editSubject));

        return subjectService()
            .editSubject(editSubject)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(editSubjectSuccess(result.body));
                }
                return dispatch(
                    editSubjectFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) => {
                return dispatch(
                    editSubjectFailure({
                        text: "Add subject error",
                        error: err,
                    }),
                );
            });
    };
}

export function deleteSubject(delSubject: ISubject) {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
        const id = delSubject._id;

        return subjectService()
            .deleteSubject(delSubject)
            .then((result) => {
                if (result.status === 200) {
                    return dispatch(destroy(id));
                }
                return dispatch(
                    deleteSubjectFailure({
                        text: "Status from server " + result.status,
                    }),
                );
            })
            .catch((err) =>
                dispatch(
                    deleteSubjectFailure({
                        text: "Add subject error",
                        error: err,
                    }),
                ),
            );
    };
}

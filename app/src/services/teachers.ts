import { ITeacher } from '../reducers/teachers';
import { apiService } from './apiService';

export default () => {
    return {
        getTeachers: () => apiService().getResource('/teachers'),
        addTeacher: (data: ITeacher) => {
            return apiService().postResource('/teachers', data);
        },
        editTeacher: (data: ITeacher) => {
            const id = data._id;
            return apiService().patchResource(`/teachers?id=${id}`, data);
        },
        deleteTeacher: (data: ITeacher) => {
            const id = data._id;
            return apiService().deleteResourse(`/teachers?id=${id}`);
        },
    };
};

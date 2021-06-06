import { ISubject } from '../reducers/subjects';
import { apiService } from './apiService';

export default () => {
    return {
        getSubjects: () => apiService().getResource('/subjects'),
        addSubject: (data: ISubject) => {
            console.log('addSubject', data);
            return apiService().postResource('/subjects', data);
        },
        editSubject: (data: ISubject) => {
            const subjectID = data._id;
            return apiService().patchResource(`/subjects?id=${subjectID}`, data);
        },
        deleteSubject: (data: ISubject) => {
            const subjectID = data._id;
            return apiService().deleteResourse(`/subjects?id=${subjectID}`);
        },
    };
};

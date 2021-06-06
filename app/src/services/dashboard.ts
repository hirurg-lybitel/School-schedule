import { IDashboard } from '../reducers/dashboard';
import { apiService } from "./apiService";

export default () => {
    return {
        getDashboards: () => apiService().getResource('/schedule'),
        addDashboard: (data: IDashboard) => {
            return apiService().postResource('/schedule', data);
        },
        editDashboard: (data: IDashboard) => {
            const id = data._id;
            return apiService().patchResource(`/schedule?id=${id}`, data);
        },
        deleteDashboard: (data: IDashboard) => {
            const id = data._id;
            return apiService().deleteResourse(`/schedule?id=${id}`);
        },
    };
};

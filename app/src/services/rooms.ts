import { IRoom } from '../reducers/rooms';
import { apiService } from "./apiService";

export default () => {
    return {
        getRooms: () => apiService().getResource('/rooms'),
        addRoom: (data: IRoom) => {
            return apiService().postResource(`/rooms`, data);
        },
        editRoom: (data: IRoom) => {
            const id = data._id;
            return apiService().patchResource(`/rooms?id=${id}`, data);
        },
        deleteRoom: (data: IRoom) => {
            const id = data._id;
            return apiService().deleteResourse(`/rooms?id=${id}`);
        }
    };
};
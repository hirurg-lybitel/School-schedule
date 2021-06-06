import * as myConst from "../constansts";

export default class ApiService {
    _apiBase = myConst.BASE_URL;

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    postResource = async (url, sendBody = {}) => {

        console.log("postResource", url, sendBody);

        const res = await fetch(
            `${this._apiBase}${url}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendBody)
            });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    deleteResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        const body = await res.json();
        return body;
    }

    getAllSubjects = async () => {
        return (await this.getResource('/subjects'))
    }

    getAllTeachers = async () => {
        return (await this.getResource('/teachers'))
    }

    getAllRooms = async () => {
        return (await this.getResource('/rooms'))
    }

    getScheduler = async () => {
        return (await this.getResource('/schedule'))
    }

    addSubject = async (insObject) => {
        const subjectName = insObject.name;
        const subjectID = insObject._id ? insObject._id : '';

        return (await this.postResource(`/subjects?name=${subjectName}&id=${subjectID}`));
    }

    addTeacher = async (insObject) => {

        const teacherName = insObject.name;
        const teacherID = insObject._id ? insObject._id : '';

        return (await this.postResource(`/teachers?name=${teacherName}&id=${teacherID}`));
    }

    addRoom = async (insObject) => {
        const roomNumber = insObject.name;
        const roomID = insObject._id ? insObject._id : '';

        return (await this.postResource(`/rooms?name=${roomNumber}&id=${roomID}`));
    }

    deleteSubject = async (id) => {
        return (await this.deleteResourse(`/subjects?id=${id}`));
    }

    deleteTeacher = async (id) => {
        return (await this.deleteResourse(`/teachers?id=${id}`));
    }

    deleteRoom = async (id) => {
        return (await this.deleteResourse(`/rooms?id=${id}`));
    }
}
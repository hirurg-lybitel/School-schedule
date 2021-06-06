type ObjectID = typeof import("mongodb").ObjectID;

export interface ITeacher {
    _id: ObjectID;
    name: string;
}

export interface ISubject {
    _id: ObjectID;
    name: string;
}

export interface IRoom{
    _id: ObjectID;
    number: string;
}

export interface IScheduler {
    _id: ObjectID;
    date: Date;
    roomId: ObjectID;
    subjectId: ObjectID;
    teacherId: ObjectID;
    time?: Date;
}
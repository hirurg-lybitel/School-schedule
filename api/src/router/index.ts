import express, { Request, Response } from 'express';
import session from 'express-session';
import config from '../config/env.config';
import mongoose from 'mongoose';

import connect from './connect';
//import dbSession from "./session";

import importModels from '../models';
import Room from '../models/Rooms';
import Teacher from '../models/Teachers';
import Subject from '../models/Subjects';
import Scheduler from '../models/Scheduler';

import _ from 'lodash';
import Rooms from '../models/Rooms';
import Subjects from '../models/Subjects';
const cors = require('cors');

const router = express.Router();
router.use(cors());
router.use(express.json());

/*
dbSession.on('error', console.log);

const sess = {
    resave: false,
    saveUninitialized: false,
    secret: "mySecret",
    proxy: true,
    name: "sid",
    cookie: {
        httpOnly: true,
        secure: false,
    },
    store: dbSession
};
router.use(session(sess));
*/

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

importModels();


router.get('/', function (req, res) {
    res.status(200);
    res.send('Home page');
});

/** Get rooms list or room by id */
router.get('/rooms', async function (req, res) {
    const id = req.query.id;
    let filter = {};
    if (id) filter = { _id: req.query.id };

    try {
        await Room.find(filter)
            .exec()
            .then((result) => {
                res.status(200).send(result);
            });
    } catch (error) {
        return res.status(500).send({ "Error": error });
    };

});

/** Get subjects list or subjects by id */
router.get('/subjects', async function (req, res) {
    const id = req.query.id;
    let filter = {};
    if (id) filter = { _id: req.query.id };

    try {
        await Subject.find(filter)
            .exec()
            .then((result) => {
                res.status(200).send(result);
            });
    } catch (error) {
        return res.status(500).send({ "Error": error });
    };
});

/** Get teachers list or teacher by id */
router.get('/teachers', async function (req, res) {
    const id = req.query.id;
    let filter = {};
    if (id) filter = { _id: req.query.id };

    try {
        await Teacher.find(filter)
            .exec()
            .then((result) => {
                res.status(200).send(result);
            });
    } catch (error) {
        return res.status(500).send({ "Error": error });
    };
});

/** Get scheduler */
router.get('/schedule', async function (req: Request, res: Response) {

    const id = req.query.id;
    let filter = {};
    if (id) filter = { _id: req.query.id };

    try {
        await Scheduler.find(filter)
            .sort({ "date": 1 })
            .populate('teacherId subjectId roomId')
            .exec()
            .then((result) => {
                //return res.status(200).json(result);
                res.status(200).send(result);
            });

    } catch (error) {
        return res.status(500).send({ "Error": error });
    }
});




/** Add room */
router.post('/rooms', async function (req, res) {
    try {
        await Room.create(req.body)
            .then((result) => { return res.status(200).send(result) });
    } catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Add subject */
router.post('/subjects', async function (req, res) {
    try {
        await Subject.create(req.body)
            .then((result) => { return res.status(200).send(result) });
    } catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Add teacher */
router.post('/teachers', async function (req, res) {
    try {
        await Teacher.create(req.body)
            .then((result) => { return res.status(200).send(result) });
    } catch (err) {
        return res.status(500).send({ "Error": err });
    }
});

/** Add schedule */
router.post('/schedule', async function (req: Request, res: Response) {
    console.log("schedule_body_post", req.body);
    try {
        let scheduler = await Scheduler.create(req.body);
        scheduler = await scheduler
            .populate('teacherId subjectId roomId')
            .execPopulate().
            then((result) => res.status(200).send(result))
        // console.log("schedule_body_scheduler", scheduler);

        //res.status(200).send(scheduler);

        return;

        scheduler = await scheduler.populate('teacherId subjectId roomId').exe()
            .then(async (result) => {
                console.log("schedule_body_exit", result);
                res.status(200).send(result);
                /** не получается вернуть данные по схеме */
                /*const filter = { "_id": result._id };

                await Scheduler.findOneAndUpdate(filter)
                    .populate('teacherId subjectId roomId')
                    .exec()
                    .then((r) => {
                        console.log("schedule_body_exit", r);
                        //return res.status(200).json(result);
                        res.status(200).send(r);
                    });*/

                /*
                                result.populate('teacherId subjectId roomId')
                                    .then((r) => {
                                        console.log("schedule_body_exit", r);
                                        return res.status(200).send(r)
                
                                    });*/
                //console.log("schedule_body_exit", result.populate('teacherId subjectId roomId'));
                //return res.status(200).send(result)
            });
    } catch (err) {
        return res.status(500).send({ "Error": err });
    }
});




/** Update room */
router.patch('/rooms', async function (req: Request, res: Response) {
    try {
        const filter = { "_id": req.query.id };
        const omitKeys = ['id', '_id', '_v'];
        const data = _.omit(req.body, omitKeys);

        await Rooms.findOneAndUpdate(filter, data, { new: true })
            .then((result) => {
                res.status(200)
                res.send(result);
            });
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Update subject */
router.patch('/subjects', async function (req: Request, res: Response) {
    try {
        const filter = { "_id": req.query.id };
        const omitKeys = ['id', '_id', '_v'];
        const data = _.omit(req.body, omitKeys);

        await Subject.findOneAndUpdate(filter, data, { new: true })
            .then((result) => {
                res.status(200)
                res.send(result);
            });
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Update teacher */
router.patch('/teachers', async function (req: Request, res: Response) {
    try {
        const filter = { "_id": req.query.id };
        const omitKeys = ['id', '_id', '_v'];
        const data = _.omit(req.body, omitKeys);

        await Teacher.findOneAndUpdate(filter, data, { new: true })
            .then((result) => {
                res.status(200)
                res.send(result);
            });
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Update scheduler */
router.patch('/schedule', async function (req: Request, res: Response) {
    try {
        const filter = { "_id": req.query.id };
        const omitKeys = ['id', '_id', '_v'];
        const data = _.omit(req.body, omitKeys);

        await Scheduler.findOneAndUpdate(filter, data, { new: true })
            .populate('teacherId subjectId roomId')
            .then((result) => {
                res.status(200)
                res.send(result);
            });
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});





/** Удаление предмета */
router.delete('/subjects', async function (req, res) {
    try {
        const filter = { _id: req.query.id };
        await Subjects.findOneAndRemove(filter).then((result) => res.status(200).send(result));
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Удаление учителя */
router.delete('/teachers', async function (req, res) {
    try {
        const filter = { "_id": req.query.id };
        await Teacher.findOneAndRemove(filter).then((result) => res.status(200).send(result));
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Удаление класса */
router.delete('/rooms', async function (req, res) {
    try {
        const filter = { "_id": req.query.id };
        await Rooms.findOneAndRemove(filter).then((result) => res.status(200).send(result));
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});

/** Delete scheduler */
router.delete('/schedule', async function (req: Request, res: Response) {
    try {
        const filter = { "_id": req.query.id };
        await Scheduler.findOneAndRemove(filter).then((result) => res.status(200).send(result));
    }
    catch (err) {
        return res.status(500).send({ "Error": err });
    };
});


export default router;

//module.exports = router;
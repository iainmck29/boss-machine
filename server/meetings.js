const express = require('express');
const { deleteAllFromDatabase, getAllFromDatabase, addToDatabase, createMeeting } = require('./db');
const meetingsRouter = express.Router();

/* GET All Route */

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'));
})

/* POST Route */

meetingsRouter.post('/', (req, res, next) => {
    const createdMeeting = createMeeting()
    if (createdMeeting) {
        addToDatabase('meetings', createdMeeting)
        res.status(201).send(createdMeeting)
    } else {
        res.status(400).send()
    }
})

/* DELETE All Route */

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    res.status(204).send()
})

module.exports = meetingsRouter;

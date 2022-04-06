const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteAllFromDatabase, deleteFromDatabasebyId, addToDatabase } = require('./db');
const ideasRouter = express.Router();

/* GET Route */

ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId)
    if (idea) {
        res.status(200).send(idea)
    } else {
        res.status(404).send()
    }
})

/* POST Route */

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const createdElement = addToDatabase('ideas', req.body)
    res.status(201).send(createdElement);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedInstance = updateInstanceInDatabase('ideas', req.body)
    if (updatedInstance) {
        res.status(200).send(updatedInstance)
    } else {
        res.status(404).send()
    }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = ideasRouter;

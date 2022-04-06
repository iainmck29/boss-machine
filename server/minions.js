const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, addToDatabase } = require('./db');
const minionsRouter = express.Router();
const workRouter = require('./work');


/* GET Routes */

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.status(200).send(minion);
    } else {
        res.status(404).send();
    }
})

/* PUT Route */

minionsRouter.put('/:minionId', (req, res, next) => {
    if (getFromDatabaseById('minions', req.params.minionId)) {
        const updatedInstance = updateInstanceInDatabase('minions', req.body)
        res.status(200).send(updatedInstance)
    } else {
        res.status(404).send();
    }
})

/* POST Route */

minionsRouter.post('/', (req, res, next) => {
    const createdElement = addToDatabase('minions', req.body)
    res.status(201).send(createdElement)
})

/* DELETE Route */

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deletedMinion) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

/* WORK Routes */

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    if (work.length === 0) {
        return res.status(404).send()
    }
    res.send(work);
  });

  minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body
    workToAdd.minionId = req.params.minionId
    const createdElement = addToDatabase('work', workToAdd)
    res.status(201).send(createdElement);
})

  minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
      const work = getFromDatabaseById('work', req.params.workId);
      if (work) {
          if (work.minionId === req.params.minionId) {
            const updatedInstance = updateInstanceInDatabase('work', req.body)
            res.status(200).send(updatedInstance)
          } else {
              res.status(400).send()
          }
      } else {
        res.status(404).send()
      }
  })

  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
      const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
      if (deletedWork) {
          res.status(204).send();
      } else {
          res.status(404).send();
      }
  })


module.exports = minionsRouter;

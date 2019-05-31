const express = require('express');
const router = express.Router();

const action = require('../data/helpers/actionModel')
const project = require('../data/helpers/projectModel')

router.use(express.json())

router.get('/', (req, res) => {
  action.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  action.get(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

router.post('/', checkProjectId, (req, res) => {
  const user = req.body
  action.insert(user)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});


router.put('/:id', checkProjectId, (req, res) => {
  const id = req.params.id
  const changes = req.body
  console.log(id, changes)
  action.update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});


router.delete('/:id', (req, res) => {
  const id = req.params.id
  action.remove(id)
  .then(data => res.status(204).json({ message: "action deleted" }))
  .catch(err => res.status(500).json({ message: "oh dear. something has gone wrong." }))
});

function checkProjectId(req, res, next) {
  const id = req.body.project_id
  project.get(id)
    .then(data => data ? req.user = data : res.status(400).json({ message: "invalid project id" }))
    .catch()
  next();
}

module.exports = router;
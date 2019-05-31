const express = require("express");
const router = express.Router();

const project = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", (req, res) => {
  project
    .get()
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

router.get("/:id", checkId, (req, res) => {
  const id = req.params.id;
  project
    .get(id)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

router.get("/:id/actions", checkId, (req, res) => {
  const id = req.params.id;
  project
    .getProjectActions(id)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

router.post("/", checkContent, (req, res) => {
  const content = req.body;
  project
    .insert(content)
    .then(data => res.status(201).json(data))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

router.put("/:id", checkId, checkContent, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  console.log(id, changes);
  project
    .update(id, changes)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

router.delete("/:id", checkId, (req, res) => {
  const id = req.params.id;
  project
    .remove(id)
    .then(data => res.status(204).json({ message: "project deleted" }))
    .catch(err =>
      res.status(500).json({ message: "oh dear. something has gone wrong." })
    );
});

function checkId(req, res, next) {
  const id = req.params.id;
  project
    .get(id)
    .then(data =>
      data
        ? (req.user = data)
        : res.status(400).json({ message: "invalid project id" })
    )
    .catch();
  next();
}

function checkContent(req, res, next) {
  const content = req.body;
  if (
    (!content.name || typeof content.name !== "string") ||
    (!content.description || typeof content.description !== "string") ||
    (content.completed && typeof content.completed !== "boolean")
  ) {
    res.status(400).json({ message: "invalid data. check your inputs." });
  }
  next();
}

module.exports = router;

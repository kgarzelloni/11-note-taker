const router = require("express").Router();
const { getNotes } = require("../db/store.js");
const store = require("../db/store.js");


// GET API Route
router.get("/notes", (req, res) => {
  store.getNotes().then((notes) => {
    return res.json(notes);
  });
});

router.post("/notes", (req, res) => {
    store.addNote (req.body) .then ((note )=> {
        return res.json (note);
    })
})

module.exports = router
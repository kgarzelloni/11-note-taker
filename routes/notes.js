const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const notes = require('express').Router();
const uuid = require("uuid");


notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received`)
 readFile('./db/db.json').then((data) =>res.json(JSON.parse(data)))
});

notes.post('/notes', (req, res) => {
    console.info(`${req.method}`)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json', JSON.stringify(parsedNotes, null),
                    (writeErr) =>
                        writeErr ? console.error(writeErr) : console.info('sucess')
                )
            }
        });res.json(newNote)
    }; 
});

module.exports = notes;
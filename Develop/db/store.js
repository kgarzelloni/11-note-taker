const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uuid = require("uuid");

class Store {
  read() {
    return readFile("db/db.json", "utf8");
  }
  write(note) {
    return writeFile("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes = [].concat(JSON.parse(notes));
      return parsedNotes;
    });
  }
  addNote(note) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    return this.getNotes()
      .then((notes) => {
        [...notes, newNote];
      })
      .then((notes) => this.write(notes))
      .then(() => newNote);
  }
}

//add method for adding a single note, use that in API routes

//add method for delete note

module.exports = new Store();

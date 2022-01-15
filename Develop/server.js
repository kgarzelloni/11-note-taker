const express = require("express");
const path = require("path");
const api = require("./db/db.json");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const uuid = require("../helpers/uuid");

// Initialize app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static("public"));

// GET * should return the `index.html` file
app.get("*", (req, res) => res.send("./index.html"));

// GET /notes` should return the `notes.html` file
app.get("/notes", (req, res) =>
  res.send(path.join(__dirname, "/notes.html"))
);

// GET API Route
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./notes.html"))
);

// POST API Route
app.post("./api/notes", (req, res) => {
  console.info(`${req.method}`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, "/db.json");
    const response = {
        status: 'success',
        body: newNote,
      };
  

    res.json(response);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE API Route
// app.delete(api)


// Function to write data to the JSON file given
// const writeToFile = ('./db.json', newNote) =>
//   fs.writeFileSynch(api, JSON.stringify(newNote, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );
//   const readAndAppend = (newNote) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedData = JSON.parse(data);
//         parsedData.push(content);
//         writeToFile(file, parsedData);
//       }
//     });
//   };

app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);

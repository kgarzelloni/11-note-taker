const express = require("express");
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlroutes");
// Initialize app variable by setting it to the value of express()
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);





// POST API Route
// app.post("./api/notes", (req, res) => {
//   console.info(`${req.method}`);

//   const { title, text } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       text,
//       id: uuid(),
//     };
//     readAndAppend(newNote, "/db.json");
//     const response = {
//         status: 'success',
//         body: newNote,
//       };
  

//     res.json(response);
//   } else {
//     res.error("Error in adding note");
//   }
// });

// DELETE API Route
// app.delete(api)


app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);

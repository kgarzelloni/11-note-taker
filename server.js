const express = require("express");
const path= require('path');
const api= require("./routes");

// Initialize app variable by setting it to the value of express()
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(api);



// GET Routes

app.get ('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get ('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get ('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);

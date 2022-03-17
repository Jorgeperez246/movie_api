//imports express module locally
const express = require("express");
const morgan = require("morgan");
//declared variable to encapsulate express's functionality for server
const app = express();

app.use(morgan("common"));

let movies = [
  {
    title: "The Terminator",
    year: "1984",
    genre: "Sci-Fi",
    director: {
      name: "James Cameron",
      birth: "1954",
      death: "-",
    },
  },
];
//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my myFlix site");
});
app.get("/movies", (req, res) => {
  res.json(movies);
});
//listen for requests
app.listen(8080, () => {
  console.log("your app is listening on port 8080.");
});

app.use(express.static("public"));
//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

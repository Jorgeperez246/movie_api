//imports express module locally
const express = require("express");
const morgan = require("morgan");
//declared variable to encapsulate express's functionality for server
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(morgan("common"));
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Jorge",
    favoriteMovies: [],
  },
];
let movies = [
  {
    title: "The Terminator",
    year: "1984",
    genre: {
      name: "Sci-Fi",
      description:
        "The Terminator is a formidable robotic assassin and soldier, designed by the military supercomputer Skynet for infiltration and combat duty, towards the ultimate goal of exterminating the Human Resistance.",
    },
    director: {
      name: "James Cameron",
      birth: "1954",
      death: "-",
    },
  },
];

//Post
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});
//PUT
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});
//Post
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle}has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});
//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle}has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});
//DElETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});
//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my myFlix site");
});
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
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

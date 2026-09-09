import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;
const OMDB_URL = "http://www.omdbapi.com";
const OMDB_KEY = "64abeb4e";

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", async (req, res) => {
  try {
    const word = req.query.word;
    const response = await axios.get(`${OMDB_URL}/`, {
      params: {
        apiKey: OMDB_KEY,
        s: word,
      },
    });
    const movies = response.data;
    console.log(movies.Search[0].Title);
    res.render("index", { movies, word });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching for movies.");
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(`${OMDB_URL}/`, {
      params: {
        apiKey: OMDB_KEY,
        i: movieId,
      },
    });
    const movieDetails = response.data;
    res.render("details", { movieDetails });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching movie details.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

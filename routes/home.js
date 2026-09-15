import axios from "axios";
import express from "express";
import { OMDB_URL, OMDB_KEY } from "../config/omdb.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const famousMovies = [
      "The Godfather",
      "The Shawshank Redemption",
      "The Dark Knight",
      "Pulp Fiction",
      "Forrest Gump",
      "Inception",
      "Fight Club",
      "Interstellar",
      "The Matrix",
      "Goodfellas",
      "The Good, the Bad and the Ugly",
      "Fantastic Mr. Fox"
    ];

    // Display random movies in the home page
    for (let index = famousMovies.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [famousMovies[index], famousMovies[randomIndex]] = [
        famousMovies[randomIndex],
        famousMovies[index],
      ];
    }

    const movies = await Promise.all(
      famousMovies.map((title) =>
        axios.get(`${OMDB_URL}/`, {
          params: {
            apiKey: OMDB_KEY,
            t: title,
          },
        }),
      ),
    );

    const movieList = movies
      .map((response) => response.data)
      .filter((movie) => movie && movie.Response === "True");

    res.render("home", { movies: movieList });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while loading featured movies.");
  }
});

export default router;

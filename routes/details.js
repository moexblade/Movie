import axios from "axios";
import express from "express";
import { OMDB_URL, OMDB_KEY } from "../config/omdb.js";

const router = express.Router();

router.get("/movies/:id", async (req, res) => {
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

export default router;
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
    const movieSchema = {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: movieDetails.Title,
      image: movieDetails.Poster !== "N/A" ? movieDetails.Poster : undefined,
      description: movieDetails.Plot !== "N/A" ? movieDetails.Plot : undefined,
      dateCreated: /^\d{4}$/.test(movieDetails.Year || "")
        ? `${movieDetails.Year}-01-01`
        : undefined,
      genre: movieDetails.Genre !== "N/A" ? movieDetails.Genre?.split(", ") : undefined,
      director: movieDetails.Director !== "N/A"
        ? movieDetails.Director?.split(", ").map((name) => ({
            "@type": "Person",
            name,
          }))
        : undefined,
      actor: movieDetails.Actors !== "N/A"
        ? movieDetails.Actors?.split(", ").map((name) => ({
            "@type": "Person",
            name,
          }))
        : undefined,
      url: `${req.app.locals.siteUrl || `http://${req.get("host")}`}/movies/${movieId}`,
    };

    const ratingValue = Number(movieDetails.imdbRating);
    const ratingCount = Number((movieDetails.imdbVotes || "").replace(/,/g, ""));
    if (Number.isFinite(ratingValue) && Number.isFinite(ratingCount) && ratingCount > 0) {
      movieSchema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue,
        bestRating: 10,
        worstRating: 1,
        ratingCount,
      };
    }

    res.render("details", { movieDetails, movieSchema });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching movie details.");
  }
});

export default router;
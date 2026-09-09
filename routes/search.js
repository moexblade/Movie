import axios from "axios";
import express from "express";
import { OMDB_URL, OMDB_KEY } from "../config/omdb.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const word = req.query.word;
    const currentPage = Number(req.query.page) || 1;
    const response = await axios.get(`${OMDB_URL}/`, {
      params: {
        apiKey: OMDB_KEY,
        s: word,
        page: currentPage,
      },
    });
    const movies = response.data;
    const totalPages = Math.ceil(Number(movies.totalResults || 0) / 10);

    res.render("index", {
      movies,
      searchWord: word,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching for movies.");
  }
});

export default router;
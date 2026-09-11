import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/about", (req,res) => {
    res.render("about");
})

export default router;
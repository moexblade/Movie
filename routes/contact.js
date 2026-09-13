import express from "express";

const router = express.Router();

router.get("/contact", (req,res) => {
    res.render("contact");
})

export default router;
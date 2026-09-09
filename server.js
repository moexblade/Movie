import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
//routes folder work
import searchRouter from "./routes/search.js";
import detailsRouter from "./routes/details.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;


//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

//routes folder applying
app.use("/", searchRouter);
app.use("/", detailsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
//routes folder work
import homeRouter from "./routes/home.js";
import searchRouter from "./routes/search.js";
import detailsRouter from "./routes/details.js";
import aboutRouter from "./routes/about.js";
import contactRouter from "./routes/contact.js";

const app = express();
const port = Number(process.env.PORT) || 8080;
app.locals.siteUrl = (process.env.SITE_URL || `http://localhost:${port}`).replace(/\/$/, "");

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/vendor/flag-icons", express.static("node_modules/flag-icons"));

// Set EJS as the view engine
app.set("view engine", "ejs");

//routes folder applying
app.use("/", homeRouter);
app.use("/", searchRouter);
app.use("/", detailsRouter);
app.use("/", aboutRouter);
app.use("/", contactRouter);

app.use((req, res) => {
  res.status(404).render("404", {
    requestedPath: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

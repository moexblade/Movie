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
const port = 8080;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

//routes folder applying
app.use("/", homeRouter);
app.use("/", searchRouter);
app.use("/", detailsRouter);
app.use("/", aboutRouter);
app.use("/", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

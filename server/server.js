import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("db connected"))
	.catch((err) => console.log(err));

// middleware
app.use(
	express.json({
		limit: "5mb",
	})
);

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(
	cors({
		origin: ["http://localhost:3000"],
	})
);

readdirSync("./routes").map((route) => {
	app.use("/api", require(`./routes/${route}`));
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));

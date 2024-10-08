import express from "express";
import routes from "./Routes/transaction.routes.js";
import connectDb from "./Db/db.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use("/api", routes)

app.listen(PORT, async () => {
    await connectDb(process.env.MONGO_URL);
    console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})
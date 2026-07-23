import express from "express";
import { executeCode } from "./Executor";
import { redisClient } from "./redis";
import { rateLimiter } from "./rateLimiter";

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.post("/execute", async (req, res) => {

    try {

        const { code, language } = req.body;

        const output = await executeCode(language, code);

        return res.json({
            success: true,
            output
        });

    } catch (error) {

        return res.json({
            success: false,
            error
        });

    }

});

async function startServer() {
    await redisClient.connect();
    console.log("[Redis] Connected");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

startServer();
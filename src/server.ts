import express from "express";
import { executePython } from "./services/pythonExecutor";
import { executeNode } from "./services/nodeExecutor";

const app = express();

app.use(express.json());

app.post("/execute", async (req, res) => {

    try {

        const { code, language } = req.body;

        let output = "";

        if (language === "python") {
            output = await executePython(code);
        }
        else if (language === "node") {
            output = await executeNode(code);
        }
        else {
            return res.json({
                success: false,
                error: "Unsupported language"
            });
        }

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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
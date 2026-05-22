import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const executePython = async (code: string): Promise<string> => {

    const filePath = path.join(process.cwd(), "temp.py");

    fs.writeFileSync(filePath, code);

    return new Promise((resolve, reject) => {

        const dockerProcess = spawn(
            "docker",
            [
                "run",
                "--memory=256m",
                "--cpus=0.5",
                "--rm",
                "-v",
                `${process.cwd()}:/app`,
                "python-runner",
                "python3",
                "/app/temp.py"
            ]
        );

        let output = "";
        let errorOutput = "";

        dockerProcess.stdout.on("data", (data:Buffer) => {
            output += data.toString();
        });

        dockerProcess.stderr.on("data", (data:Buffer) => {
            errorOutput += data.toString();
        });

        const timeout = setTimeout(() => {
            dockerProcess.kill();
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            reject("Execution timed out");
        }, 5000);

        dockerProcess.on("close", () => {
            clearTimeout(timeout);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }       

            if (errorOutput) {
                reject(errorOutput);
            } else {
                resolve(output);
            }
        });
    });
};
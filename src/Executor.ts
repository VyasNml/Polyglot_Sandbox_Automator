import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const languageConfig = {
    python: {
        extension: "py",
        image: "python-runner",
        command: "python3"
    },
    node: {
        extension: "js",
        image: "node-runner",
        command: "node"
    }
};

export const executeCode = async (
    language: keyof typeof languageConfig,
    code: string
): Promise<string> => {

    const config = languageConfig[language];

    if (!config) {
        throw new Error("Unsupported language");
    }

    const fileName = `temp.${config.extension}`;
    const filePath = path.join(process.cwd(), fileName);

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
                config.image,
                config.command,
                `/app/${fileName}`
            ]
        );

        let output = "";
        let errorOutput = "";

        dockerProcess.stdout.on("data", (data: Buffer) => {
            output += data.toString();
        });

        dockerProcess.stderr.on("data", (data: Buffer) => {
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
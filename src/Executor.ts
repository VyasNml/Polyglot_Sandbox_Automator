import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

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

const EXECUTION_TIMEOUT_MS = 5000;

export const executeCode = async (
    language: keyof typeof languageConfig,
    code: string
): Promise<string> => {
    
    const config = languageConfig[language];
    
    console.log(`[Executor] Starting ${language} execution`);   //comment
    
    if (!config) {
        throw new Error("Unsupported language");
    }

    const fileName = `temp.${config.extension}`;
    const filePath = path.join("/workspace", fileName);

    console.log(`[Executor] Creating temporary file: ${filePath}`);     //comment
    fs.writeFileSync(filePath, code);
    console.log("[Executor] Temporary file created successfully.");     //comment

    return new Promise((resolve, reject) => {

        const workspaceVolume = process.env.WORKSPACE_VOLUME;

        if (!workspaceVolume) {
            reject("Workspace volume is not configured.");
            return;
        }

        console.log("[Executor] Starting Docker container...");     //comment

        const containerName = `sandbox-${language}-${crypto.randomUUID()}`;

        const dockerProcess = spawn(
            "docker",
            [
                "run",
                "--name",
                containerName,
                "--memory=256m",
                "--cpus=0.5",
                "--rm",
                "-v",
                `${workspaceVolume}:/workspace`,
                config.image,
                config.command,
                `/workspace/${fileName}`
            ]
        );

        let output = "";
        let errorOutput = "";

        dockerProcess.stdout.on("data", (data: Buffer) => {
            const text = data.toString();
            output += text;
            console.log(`[Container STDOUT] ${text.trim()}`);   //comment
        });

        dockerProcess.stderr.on("data", (data: Buffer) => {
            const text = data.toString();
            errorOutput += text;
            console.log(`[Container STDERR] ${text.trim()}`);   //comment
        });

        const timeout = setTimeout(() => {
            dockerProcess.kill();

            spawn("docker", ["kill", containerName]);
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            
            reject("Execution timed out");

        }, EXECUTION_TIMEOUT_MS);

        dockerProcess.on("close", (code, signal) => {
            
            clearTimeout(timeout);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            if (code === 137) {
                reject("Memory limit exceeded");
                return;
            }
        
            if (errorOutput) {
                reject(errorOutput);
            } else {
                resolve(output);
            }
        });

    });
};
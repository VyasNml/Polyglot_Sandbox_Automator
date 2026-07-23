import { Request, Response, NextFunction } from "express";
import { redisClient } from "./redis";

export const rateLimiter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ip = req.ip ?? "unknown";
    const key = `rate:${ip}`;
    
    const requests = await redisClient.incr(key);
    
    if (requests === 1) {
        await redisClient.expire(key, 60);
    }
    
    if (requests > 20) {
        return res.status(429).json({
            success: false,
            error: "Rate limit exceeded. Try again later."
        });
    }

    next();

};
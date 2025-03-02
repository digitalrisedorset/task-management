import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import { OpenAiController } from "../controller/OpenAiController";

export const setupOpenAiRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const openAiController = new OpenAiController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`openAi request: ${req.url}`)
        next()
    })

    router.get("/improved-text", openAiController.getImprovedText)

    router.options('*', options);

    app.use(config.route.openAiApiPrefix, router)
}
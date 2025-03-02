import {setupOpenAiRoutes} from "./openAiRouter"
import {Application} from "express";

export default (app: Application) => {
    setupOpenAiRoutes(app)
}
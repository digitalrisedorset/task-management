import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import {OpenAiTranslator} from "../model/OpenAiTranslator";
import {TranslateControllerInterface} from "./TranslateControllerInterface";

export class OpenAiController implements TranslateControllerInterface {
    errorWrapper = new ErrorWrapper()

    getImprovedText = async (req: Request, res: Response) => {
        try {
            const aiTranslator = new OpenAiTranslator()
            const result = await aiTranslator.getImprovedText(req.text)
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }
}
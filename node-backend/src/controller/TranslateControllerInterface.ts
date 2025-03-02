import { Request, Response } from "express";

export type ErrorResponse = {
    "error": string
}

type BaseResponse<TData> = TData | ErrorResponse;

export type AttributeResponse = BaseResponse<[{
        "code": string;
        "name": string;
        "type": "unknown" | "options"
    }]>


export interface TranslateControllerInterface {
    getImprovedText: (req: Request, res: Response) => Promise<any>;
}
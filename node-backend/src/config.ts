const dotenv = require('dotenv');
dotenv.config();
const appRoot = require('app-root-path');

export type configInfo = {
    port: number;
    frontendUrl: string;
    openai: {
        apiUrl: string,
        apiKey: string,
        model: string
    },
    route: {
        apiPrefix: string;
        openAiApiPrefix: string
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    frontendUrl: (process.env.FRONTEND_URL === undefined)?'http://localhost:3001':process.env.FRONTEND_URL,

    openai: {
        apiUrl: (process.env.OPENAI_URL === undefined)?'localhost':process.env.OPENAI_URL,
        apiKey: (process.env.OPENAI_SECRET === undefined)?'dddfsaafdsg': process.env.OPENAI_SECRET,
        model: (process.env.OPENAI_MODEL === undefined)?'o3-mini': process.env.OPENAI_MODEL,
    },

    /**
     * Routes access
     */
    route: {
        apiPrefix: '/',
        openAiApiPrefix: '/ai'
    },
    rootDir: appRoot.resolve('/'),
}
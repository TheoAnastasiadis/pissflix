import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import { pipe } from "fp-ts/lib/function"
import { parseRoute, router } from "./router"
import { handleError } from "./error.handler"
import { handleSuccess } from "./success.handler"
import applicationConfig from "../core/config/app.config"
import path from "path"

const app = express()

//Middleware
const corsOptions = {
    origin: /https?:\/\/msx\.benzac\.de/,
    optionsSuccessStatus: 200,
}
const middleware = [
    morgan("tiny"),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(corsOptions),
]
app.use(middleware)

app.use(
    `/${applicationConfig.staticPath}`,
    express.static(path.resolve(__dirname, "../../../assets"))
)

//Handlers
app.get(
    "*",
    async (req, res) =>
        await pipe(
            parseRoute(req.originalUrl, router),
            handleError(res),
            handleSuccess(res)
        )()
)

export default app

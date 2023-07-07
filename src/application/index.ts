import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import { pipe } from "fp-ts/lib/function"
import { parseRoute, router } from "./router"
import { handleError } from "./error.handler"
import { handleSuccess } from "./success.handler"
import applicationConfig from "../core/config/app.config"
import path from "path"

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(
    `Static files served from ${path.resolve(__dirname, "../../../assets")}`
)
app.use(
    `/${applicationConfig.staticPath}`,
    express.static(path.resolve(__dirname, "../../../assets"))
)

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

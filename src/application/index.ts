import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import { pipe } from "fp-ts/lib/function"
import { parseRoute, router } from "./router"
import { handleError } from "./error.handler"
import { handleSuccess } from "./success.handler"

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

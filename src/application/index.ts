import express from "express"
import { pipe } from "fp-ts/lib/function"
import { parseRoute, router } from "./router"
import { handleError } from "./handlers/error.handler"
import { handleSuccess } from "./handlers/success.handler"
import { removeMsxQueryParams } from "./helpers/removeMsxQueryParams.helper"
import { middleware } from "./middleware"

const app = express()

app.use(middleware)

//Handlers
app.all(
    "*",
    async (req, res) =>
        await pipe(
            parseRoute(removeMsxQueryParams(req.originalUrl), router),
            handleError(res),
            handleSuccess(res)
        )()
)

export default app

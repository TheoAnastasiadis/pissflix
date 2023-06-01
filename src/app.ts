import express, { Response } from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import * as R from "fp-ts-routing"
import * as TE from "fp-ts/TaskEither"
import { MovieRouter } from "./domain/movies/setup"
import { MovieContextImpl, MovieControllersImpl } from "./data/movies"
import { MovieMatchers } from "./domain/movies/controllers/matchers"
import { pipe } from "fp-ts/lib/function"

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = pipe(
    R.zero<TE.TaskEither<string, object>>().map(() => TE.left("zero")),
    MovieRouter(MovieControllersImpl, MovieMatchers, MovieContextImpl)
)

type ResultT = { result: TE.TaskEither<string, object>; _tag: "view" }

const errorPage = {
    result: TE.left("404"),
    _tag: "view",
} as const

const parseRoute: (route: string, router: R.Parser<ResultT>) => ResultT = (
    route,
    router
) => R.parse(router, R.Route.parse(route), errorPage)

const handleError: (res: Response) => (result: ResultT) => {
    _tag: "view"
    result: TE.TaskEither<ReturnType<Response["send"]>, object>
} = (res) => (result) =>
    pipe(
        result.result,
        TE.mapLeft((error) => res.status(404).send(error)),
        (modifiedResult) => ({ _tag: result._tag, result: modifiedResult })
    )

const handleSuccess: (
    res: Response
) => (result: {
    _tag: "view"
    result: TE.TaskEither<ReturnType<Response["send"]>, object>
}) => TE.TaskEither<
    ReturnType<Response["send"]>,
    ReturnType<Response["json"]>
> =
    (res) =>
    ({ _tag, result }) =>
        pipe(
            result,
            TE.map((content) => res.json(content))
        )

app.all(
    "*",
    async (req, res) =>
        await pipe(
            parseRoute(req.originalUrl, router),
            handleError(res),
            handleSuccess(res)
        )()
)

export default app

import express, { Response } from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import * as R from "fp-ts-routing"
import * as TE from "fp-ts/TaskEither"
import { registerMovieRouter } from "./domain/movies/router"
import { MovieContextImpl, MovieControllersImpl } from "./data/movies"
import { MovieMatchers } from "./domain/movies/controllers/matchers"
import { pipe } from "fp-ts/lib/function"
import { registerCommonRouter } from "./domain/common/router"
import { commonMatchers } from "./domain/common/controllers/matchers"
import { commonContextImpl, commonControllersImpl } from "./data/common"

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = pipe(
    R.zero<TE.TaskEither<string, object>>().map(() => TE.left("zero")),
    registerCommonRouter(
        commonControllersImpl,
        commonMatchers,
        commonContextImpl
    ),
    registerMovieRouter(MovieControllersImpl, MovieMatchers, MovieContextImpl)
)

type ResultT =
    | { result: TE.TaskEither<string, object>; _tag: "view" }
    | { result: TE.TaskEither<string, string>; _tag: "redirection" }

const errorPage = {
    result: TE.left(
        JSON.stringify(
            { code: 404, message: "The requested resource could not be found" },
            undefined,
            2
        )
    ),
    _tag: "view",
} as const

const parseRoute: (route: string, router: R.Parser<ResultT>) => ResultT = (
    route,
    router
) => R.parse(router, R.Route.parse(route), errorPage)

const handleError: (res: Response) => (result: ResultT) => {
    _tag: ResultT["_tag"]
    result: TE.TaskEither<ReturnType<Response["send"]>, string | object>
} = (res) => (result) => ({
    _tag: result._tag,
    result: TE.mapError((error) => res.status(404).send(error))(
        result.result as TE.TaskEither<any, object | string>
    ),
})
const handleSuccess: (
    res: Response
) => (result: {
    _tag: ResultT["_tag"]
    result: TE.TaskEither<ReturnType<Response["send"]>, object | string>
}) => TE.TaskEither<
    ReturnType<Response["send"]>,
    ReturnType<Response["json"]> | ReturnType<Response["redirect"]>
> =
    (res) =>
    ({ _tag, result }) => {
        switch (_tag) {
            case "view":
                return pipe(result, TE.map(res.json.bind(res)))
                break
            case "redirection":
                return pipe(
                    result as TE.TaskEither<
                        ReturnType<Response["send"]>,
                        string
                    >,
                    TE.map(res.redirect.bind(res))
                )
                break
        }
    }

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

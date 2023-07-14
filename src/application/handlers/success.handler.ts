import { Response } from "express"
import { pipe } from "fp-ts/lib/function"
import { Result } from "../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"

export const handleSuccess: (
    res: Response
) => (result: {
    _tag: Result["_tag"]
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
            case "response":
                return pipe(result, TE.map(res.json.bind(res)))
            case "redirection":
                return pipe(
                    result as TE.TaskEither<
                        ReturnType<Response["send"]>,
                        string
                    >,
                    TE.map(res.redirect.bind(res))
                )
        }
    }

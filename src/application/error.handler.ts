import { Response } from "express"
import { Result } from "../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"

export const errorPage = {
    result: TE.left(
        JSON.stringify(
            { code: 404, message: "The requested resource could not be found" },
            undefined,
            2
        )
    ),
    _tag: "view",
} as const

export const handleError: (res: Response) => (result: Result) => {
    _tag: Result["_tag"]
    result: TE.TaskEither<ReturnType<Response["send"]>, string | object>
} = (res) => (result) => ({
    _tag: result._tag,
    result: TE.mapError((error) => res.status(404).send(error))(
        result.result as TE.TaskEither<any, object | string>
    ),
})

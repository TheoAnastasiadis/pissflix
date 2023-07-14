import * as TE from "fp-ts/TaskEither"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"
import { MsxServerResponse } from "../msxUI/response"

type MsxContent = MsxContentRoot | MsxMenu

//this type represents json responses
export type Controller<C, P = {}> = {
    _tag: "view"
    render: (
        context: C,
        ...args: any[]
    ) => (params: P) => TE.TaskEither<string, MsxContent>
}

//this type represents redirect responses
export type Redirection<C, P = {}> = {
    _tag: "redirection"
    render: (context: C) => (params: P) => TE.TaskEither<string, string>
}

//this type represents server responses
export type Response<C, P = {}> = {
    _tag: "response"
    render: (
        context: C
    ) => (params: P) => TE.TaskEither<string, MsxServerResponse>
}

export type Result = {
    _tag: (
        | Controller<any, any>
        | Redirection<any, any>
        | Response<any, any>
    )["_tag"]
    result: TE.TaskEither<string, object>
}

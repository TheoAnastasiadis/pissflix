import * as TE from "fp-ts/TaskEither"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"

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

export type Result = {
    _tag: (Controller<any, any> | Redirection<any, any>)["_tag"]
    result: TE.TaskEither<string, object>
}

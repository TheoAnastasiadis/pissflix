import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"

type MsxContent = MsxContentRoot | MsxMenu

//this type represents redirecting routes
//These routes should be invoced by GET requests.
export type Controller<C, P = {}> = {
    _tag: "view"
    render: (
        context: C,
        ...args: any[]
    ) => (params: P) => TE.TaskEither<string, MsxContent>
}

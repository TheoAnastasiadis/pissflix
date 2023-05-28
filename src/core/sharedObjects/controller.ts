import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"

type MsxContent = MsxContentRoot | MsxMenu

//this type represents redirecting routes
//These routes should be invoced by GET requests.
export type Controller<
    P extends string,
    C,
    D extends t.Decoder<object, object> = t.Type<{}>
> = {
    _tag: "view"
    _path: P
    _decoder: D
    render: (
        context: C
    ) => (decoder: D) => (params: any) => TE.TaskEither<MsxContent, MsxContent>
}

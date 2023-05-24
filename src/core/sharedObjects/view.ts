import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"

type MsxContent = MsxContentRoot | MsxMenu

//this type represents renderable routes (routes that return json objects parsable by MSX)
//These routes should be invoced by GET requests.
export type View<C, D extends t.Decoder<object, object> = t.Type<{}>> = (
    context: C
) => (decoder: D) => (params: any) => TE.TaskEither<MsxContent, MsxContent>

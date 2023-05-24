import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"

//this type represents non renderable routes (routes that return json objects not parsable by MSX)
//These routes should be invoced by POST requests.
export type Redirection<C, D extends t.Decoder<object, object> = t.Type<{}>> = (context: C) => (decoder: D) => (params: any) => TE.TaskEither<string, string>
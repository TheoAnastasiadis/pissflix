import * as TE from "fp-ts/TaskEither"

export type SetUpFunction = (
    path: string,
    hanlder: (req: any, res: any) => Promise<any>
) => void

export class ResponseAdaptor<A, B> {
    paramsGetter: (req: A) => Object
    responder: (res: B) => (content: any) => void
    constructor(
        paramsGetter: (req: A) => Object,
        responder: (res: B) => (content: any) => void
    ) {
        ;(this.paramsGetter = paramsGetter), (this.responder = responder)
    }
    handler: (
        contentGetter: (params: any) => TE.TaskEither<any, any>
    ) => (req: A, res: B) => Promise<any> =
        (contentGetter) => async (req, res) => {
            const respondWith = this.responder(res)
            const params = this.paramsGetter(req)
            respondWith(await contentGetter(params)())
        }
}

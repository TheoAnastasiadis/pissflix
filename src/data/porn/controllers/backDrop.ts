import { pipe } from "fp-ts/lib/function"
import { Response } from "../../../core/sharedObjects/controller"
import { PornContext } from "../../../domain/porn/controllers/context"
import { backDropParams } from "../../../domain/porn/controllers/params"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { getRandomImage } from "../../../domain/common/useCases/getRandomImage"
import { MsxServerResponse } from "../../../core/msxUI/response"

export const backdropResponse: Response<
    PornContext,
    t.TypeOf<typeof backDropParams>
> = {
    _tag: "response",
    render: (context) => (params) =>
        pipe(
            params.query,
            (q) => getRandomImage(q)(context.photosRepo),
            TE.map(
                (image) =>
                    ({
                        response: {
                            status: 200,
                            text: "Backdrop Update",
                            message: undefined,
                            data: {
                                action: "interaction:load:http://msx.benzac.de/interaction/backdrop.html",
                                data: {
                                    url: image,
                                    type: 1,
                                },
                            },
                        },
                    } satisfies MsxServerResponse)
            )
        ),
}

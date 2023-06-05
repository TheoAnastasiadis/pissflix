import { Redirection } from "../../../core/sharedObjects/controller"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { streamParams } from "../../../domain/movies/controllers/params"
import * as t from "io-ts"
import { getStreamingLink } from "../../../domain/common/useCases/getStreamingLink"

export const streamRedirection: Redirection<
    MovieContext,
    t.TypeOf<typeof streamParams>
> = {
    _tag: "redirection",
    render: (context) => (params) =>
        getStreamingLink(context.debridRepo)(Number(params.fileIdx))(
            params.magnet
        ),
}

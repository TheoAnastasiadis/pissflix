import { Redirection } from "../../../core/sharedObjects/controller"
import { CommonContext } from "../../../domain/common/controllers/context"
import { subtitleParams } from "../../../domain/common/controllers/params"
import * as t from "io-ts"
import { downloadSubtitles } from "../../../domain/common/useCases/downloadSubtitles"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/lib/function"

export const subtitleRedirection: Redirection<
    CommonContext,
    t.TypeOf<typeof subtitleParams>
> = {
    _tag: "redirection",
    render: (context) => (params) =>
        pipe(
            params,
            (params) => Number(params.id),
            downloadSubtitles(context.subtitleRepo),
            TE.map(({ link, isVtt }) => link)
        ),
}

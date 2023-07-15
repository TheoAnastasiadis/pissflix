import { Controller } from "../../../core/sharedObjects/controller"
import { CommonContext } from "../../../domain/common/controllers/context"
import * as TE from "fp-ts/TaskEither"
import appConfig from "../../../core/config/app.config"

export const startObject: Controller<CommonContext> = {
    _tag: "view",
    render: () => () =>
        TE.right({
            name: "Pissflix",
            version: "1.0.0",
            parameter: `content:${appConfig.externalURL}/msx/menu`,
        }),
}

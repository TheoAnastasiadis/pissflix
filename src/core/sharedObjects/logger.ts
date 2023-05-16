import { SystemClock } from "clock-ts"
import * as RIO from "fp-ts-contrib/ReaderIO"
import * as C from "fp-ts/Console"
import { flow, pipe } from "fp-ts/function"
import * as L from "logger-fp-ts"

const env: L.LoggerEnv = {
    clock: SystemClock,
    logger: pipe(C.log, L.withShow(L.ShowLogEntry)),
}

export const log = (object: any) =>
    pipe(
        RIO.of(object),
        RIO.chainFirst(() => L.info("Some action was performed")),
        RIO.chainFirst(L.debugP("And here's the details"))
    )(env)()

const b = log({ a: 1 })

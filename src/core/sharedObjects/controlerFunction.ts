import { Request, Response } from "express-serve-static-core"

export type ControlerFunction<T> = (req: Request) => T

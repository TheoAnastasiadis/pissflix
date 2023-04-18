import { Result } from "./result"

export type ViewsHandler<T> = () => Result<T> | Promise<Result<T>>

export interface ViewsRegistry<T> {
    routes: [T, ViewsHandler<any>][]
    registerRoute(path: T, handler: ViewsHandler<any>): void
}

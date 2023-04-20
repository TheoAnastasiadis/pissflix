import { Result } from "./result"

export type ViewsHandler<T> = (
    viewsRegistry: ViewsRegistry
) => Result<T> | Promise<Result<T>>

export interface ViewsRegistry {
    applicationLevelUrl: string
    entityLevelUrl: string
    entityRoutes: [string, ViewsHandler<any>][]
    registerRoute(path: string, handler: ViewsHandler<any>): void
    getAbsolutePath(path: string): string
}

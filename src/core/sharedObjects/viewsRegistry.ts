import { Result } from "./result"

export type ViewsHandler<R> = (
    viewsRegistry: ViewsRegistry,
    repo?: R,
    params?: { [key: string]: string | number | boolean }
) => Result<any> | Promise<Result<any>>

export type params = {
    [key: string]: string | number | boolean
}

export type Routes = {
    [key: string]: {
        path: string
        params?: string[]
    }
}

export interface ViewsRegistry {
    applicationLevelUrl: string
    entityLevelUrl: string
    entityRoutes: [string, ViewsHandler<any>, params?][]
    registerRoute(
        path: string,
        handler: ViewsHandler<any>,
        params?: params
    ): void
    getAbsolutePath(path: string): string
}

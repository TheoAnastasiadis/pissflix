import {
    ViewsRegistry,
    ViewsHandler,
} from "../../../core/sharedObjects/viewsRegistry"

export class MoviesViewsRegistry implements ViewsRegistry {
    applicationLevelUrl: string
    entityLevelUrl: string = "movies/"
    entityRoutes: [string, ViewsHandler<any>][] = []
    constructor(applicationUrl: string) {
        this.applicationLevelUrl = applicationUrl
    }
    registerRoute(path: string, handler: ViewsHandler<any>): void {
        this.entityRoutes.push([path, handler])
    }
    getAbsolutePath(path: string): string {
        if (this.entityRoutes.map((route) => route[0]).indexOf(path) < 0) {
            throw `Path /${path} does not exist in this registry`
        }
        return this.applicationLevelUrl + this.entityLevelUrl + path
    }
}

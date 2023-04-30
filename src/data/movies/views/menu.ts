import { MsxMenu } from "../../../core/msxUI/menuObject"
import { Result } from "../../../core/sharedObjects/result"
import { View } from "../../../core/sharedObjects/view"

export class MainMovieMenu extends View<MsxMenu> {
    constructor(externalUrl: string, moviesUrl: string, viewUrl: string) {
        super(externalUrl, moviesUrl, viewUrl)
    }
    renderer = () => {
        return new Result<MsxMenu>(true, undefined, new MsxMenu({}))
    }
}

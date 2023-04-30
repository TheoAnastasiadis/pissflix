import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import { Result } from "../../../core/sharedObjects/result"
import { View } from "../../../core/sharedObjects/view"

export class DiscoverPage extends View<MsxContentRoot> {
    constructor(
        externalUrl: string,
        moviesUrl: string,
        discoverPageUrl: string
    ) {
        super(externalUrl, moviesUrl, discoverPageUrl)
    }
    renderer = async () => {
        const content = new MsxContentRoot()

        return new Result<MsxContentRoot>(true, undefined, content)
    }
}

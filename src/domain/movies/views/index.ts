import * as t from "io-ts"
import { View, viewRenderer } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../repos/movies.repo"

const panelParams = {
    optional: {
        discoverType: t.union([t.literal("day"), t.literal("week")]),
        genreId: t.number,
        era: t.number,
        region: t.string,
        query: t.string,
    },
    mandatory: {
        page: t.number,
        limit: t.number,
    },
}

const infoParams = {
    id: t.number,
}

type MovieViews = {
    menu: {
        relativePath: "menu/"
        view: View<[MoviesRepoT]>
        params: t.TypeC<{}>
    }
    resultsPanel: {
        relativePath: "results_panel/"
        view: View<[MoviesRepoT]>
        params: t.UnionC<
            [
                t.PartialC<typeof panelParams.optional>,
                t.TypeC<typeof panelParams.mandatory>
            ]
        >
    }
    info: {
        relativePath: "info/"
        view: View<[MoviesRepoT]>
        params: t.TypeC<typeof infoParams>
    }
}

export { MovieViews, panelParams, infoParams }

import { pipe, flow, identity } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths, panelParams } from "../../../domain/movies/controllers"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
import { regions } from "../../../core/sharedObjects/regions"
import { getMoviesByRegion } from "../../../domain/movies/useCases/getMoviesByRegion"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import {
    MsxContentRoot,
    addItemToContent,
} from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { errorPage } from "./helpers/errorPage"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

export const panelView: Controller<
    MoviePaths["panel"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    },
    typeof panelParams
> = {
    _tag: "view",
    _path: `/movies/panel`,
    render: (context) => (decoder: typeof panelParams) => (params: any) =>
        pipe(
            params,
            decoder.decode,
            E.mapLeft(
                () =>
                    (errorPage(`Search params must contain 'page', 'limit' and at least one of: 'decade', 'genre', 'region' or 'trending'`)) as TE.TaskEither<MsxContentRoot, MsxContentRoot>
            ),
            E.map((searchParams) =>
                pipe(
                    O.fromNullable(searchParams.decade), //decade
                    O.map(d =>
                        getMoviesByDecade(context.moviesRepo)({
                            page: searchParams.page,
                            limit: searchParams.limit,
                        })(d),
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.genre), //genre
                            O.map((genreId) => ({
                                uniqueId: genreId,
                                name: "",
                            })),
                            O.map(
                                getMoviesByGenre(context.moviesRepo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.region), //region
                            O.chain((regionName) =>
                                O.fromNullable(
                                    regions.find(
                                        (region) => region.name == regionName
                                    )
                                )
                            ),
                            O.map(
                                getMoviesByRegion(context.moviesRepo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    O.alt(() =>
                        pipe(
                            O.fromNullable(searchParams.trending), //trending
                            O.map(
                                getTrendingMovies(context.moviesRepo)({
                                    page: searchParams.page,
                                    limit: searchParams.limit,
                                })
                            )
                        )
                    ),
                    O.map(TE.map((movies) =>
                        pipe(
                            movies,
                            A.reduce(
                                {
                                    headline: "Relevant Results",
                                    type: "list",
                                    template: {
                                        titleHeader: "headline",
                                        titleFooter: "subtitle",
                                        layout: "0,0,2,4",
                                        type: "separate",
                                    },
                                } as MsxContentRoot,
                                (content, movie) =>
                                    pipe(
                                        movie,
                                        (movie) => ({
                                            titleHeader: movie.title,
                                            titleFooter: moment
                                                .unix(movie.release)
                                                .format("YYYY"),
                                        }),
                                        addItemToContent(content)
                                    )
                            ),
                        ))
                    ),
                    O.map(TE.mapLeft(errorPage)),
                    O.getOrElse(() => TE.left(errorPage(`Search params must contain at least one of: 'decade', 'genre', 'region' or 'trending'`)))
                )
            ),
            E.getOrElseW(identity)
    ),
}

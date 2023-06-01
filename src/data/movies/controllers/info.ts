import { Controller } from "../../../core/sharedObjects/controller"
import { pipe } from "fp-ts/lib/function"
import { MovieContext } from "../../../domain/movies/controllers/context"
import * as TE from "fp-ts/TaskEither"
import { getMovieById } from "../../../domain/movies/useCases/getMovieById"
import { errorPage } from "./helpers/errorPage"
import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { MovieT } from "../../../domain/movies/entities/movie"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { infoParams } from "../../../domain/movies/controllers/params"

const toContent =
    (remoteWatchPath: string, localWatchPath: string) => (movie: MovieT) =>
        ({
            type: "pages",
            pages: [
                {
                    background: movie.background.bestQuality,
                    items: [
                        {
                            layout: "0,0,4,6",
                            type: "space",
                            image: movie.poster.bestQuality,
                            "image-filler": "smart",
                        },
                        {
                            layout: "4,0,8,1",
                            type: "space",
                            title: `${movie.title} (${moment
                                .unix(movie.release)
                                .format("YYYY")})`,
                            titleFooter: movie.tagline,
                            alignment: "center",
                        },
                        {
                            layout: "4,1,8,1",
                            title: "{txt:msx-white-soft:Description}",
                            titleFooter: `{txt:msx-white:${movie.overview}}`,
                            type: "space",
                        },
                        {
                            layout: "4,2,8,1",
                            title: "{txt:msx-white-soft:Info}",
                            titleFooter: `{ico:timelapse}{txt:msx-white:${
                                movie.runtime
                            }'}{tb}{ico:style}{txt:msx-white:${movie.genres
                                .map((genre) => genre.name)
                                .reduce(
                                    (p, c) => p + ", " + c
                                )}}{tb}{ico:volume-down-alt}{txt:msx-white:${movie.languages
                                .map((language) => language.toString())
                                .reduce(
                                    (p, c) => p + ", " + c
                                )}}{tb}{ico:language}{txt:msx-white:${movie.countries
                                .map((country) => country.toString())
                                .reduce((p, c) => p + ", " + c)}}`,
                            type: "space",
                        },
                        {
                            layout: "4,3,3,1",
                            type: "default",
                            label: "Watch Trailer{tb}{ico:smart-display}",
                            enable: false,
                        },
                        {
                            layout: "4,4,3,1",
                            type: "default",
                            label: "Play Locally{tb}{ico:local-play}",
                            action: localWatchPath,
                        },
                        {
                            layout: "7,4,3,1",
                            type: "default",
                            label: "Play Remotely{tb}{ico:play-circle}",
                            action: remoteWatchPath,
                        },
                    ],
                },
            ],
        } as MsxContentRoot)

export const infoView: Controller<MovieContext, t.TypeOf<typeof infoParams>> = {
    _tag: "view",
    render: (context, topLevelRoute: R.Route) => (params) =>
        pipe(
            TE.of(Number(params.id)),
            TE.chain(getMovieById(context.moviesRepo)),
            TE.map((movie) =>
                toContent(
                    context.matchers.watch.formatter
                        .run(R.Route.empty, {
                            imdbId: movie.imdbId as string,
                            player: "remote",
                            title: movie.title,
                        })
                        .toString(),
                    context.matchers.watch.formatter
                        .run(R.Route.empty, {
                            imdbId: movie.imdbId as string,
                            player: "local",
                            title: movie.title,
                        })
                        .toString()
                )(movie)
            )
        ),
}

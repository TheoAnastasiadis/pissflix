import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { pipe } from "fp-ts/lib/function"
import { MoviePaths, infoParams } from "../../../domain/movies/views"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import { getMovieById } from "../../../domain/movies/useCases/getMovieById"
import { errorPage } from "./helpers/errorPage"
import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { MovieT } from "../../../domain/movies/entities/movie"

import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

const toContent = (watchPath: string) => (movie: MovieT) =>
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
                        action: `${watchPath}?${new URLSearchParams({
                            title: movie.title,
                            imdbId: movie.imdbId || "",
                            player: "local",
                        }).toString()}`,
                    },
                    {
                        layout: "7,4,3,1",
                        type: "default",
                        label: "Play Remotely{tb}{ico:play-circle}",
                        action: `${watchPath}?${new URLSearchParams({
                            title: movie.title,
                            imdbId: movie.imdbId || "",
                            player: "remote",
                        }).toString()}`,
                    },
                ],
            },
        ],
    } as MsxContentRoot)

export const infoView: View<
    { moviesRepo: MoviesRepoT; torrentsRepo: TorrentRepo; paths: MoviePaths },
    typeof infoParams
> =
    (context: {
        moviesRepo: MoviesRepoT
        torrentsRepo: TorrentRepo
        paths: MoviePaths
    }) =>
    (decoder: typeof infoParams) =>
    (params: any) =>
        pipe(
            params,
            decoder.decode,
            E.mapLeft(() => `Please provide a valid movie id (integer)`),
            E.map((searchParams) =>
                pipe(
                    TE.of(searchParams.id),
                    TE.chain(getMovieById(context.moviesRepo)),
                    TE.map(toContent(context.paths.watch)),
                    TE.mapLeft(errorPage)
                )
            ),
            E.getOrElse((errorMessage) => TE.left(errorPage(errorMessage)))
        )

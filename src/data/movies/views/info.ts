import { View } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { pipe, flow } from "fp-ts/lib/function"
import { infoParams } from "../../../domain/movies/views"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"

import { getMovieById } from "../../../domain/movies/useCases/getMovieById"
import { errorPage } from "./helpers/errorPage"
import { MsxContentPage, MsxContentRoot } from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { MovieT } from "../../../domain/movies/entities/movie"
import { TorrentT } from "../../../domain/torrents/entities/torrent"
import { getTorrentsById } from "../../../domain/torrents/useCases/getTorrentById"
import { TorrentRepo } from "../../../domain/torrents/repos/torrent.repo"
import { indexOfResolution } from "../../../domain/torrents/entities/resolution"
import _ from 'lodash/fp'

const infoPage : (movie: MovieT) => MsxContentPage = (movie) => ( {
    background:
        movie.background.bestQuality,
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
                .map((language) =>
                    language.toString()
                )
                .reduce(
                    (p, c) => p + ", " + c
                )}}{tb}{ico:language}{txt:msx-white:${movie.countries
                .map((country) =>
                    country.toString()
                )
                .reduce(
                    (p, c) => p + ", " + c
                )}}`,
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
            label: "Play{tb}{ico:local-play}",
            action: "key:right",
        },
    ],
})

const linksPages : (torrents: TorrentT[]) => MsxContentPage[] = (torrents) => pipe(
    torrents,
    _.sortBy((torrent) => indexOfResolution(torrent.resolution)),
    _.chunk()
    g => ([{}])
)

const toContent : (movie: MovieT, torrents: TorrentT[]) => MsxContentRoot = (movie, torrents) => ({
    type: "pages",
    pages: [
        infoPage(movie),
        ...linksPages(torrents)
    ],
})

export const infoView: View<{ moviesRepo: MoviesRepoT, torrentsRepo: TorrentRepo }, typeof infoParams> =
    (context: { moviesRepo: MoviesRepoT, torrentsRepo: TorrentRepo }) =>
    (decoder: typeof infoParams) =>
    (params: any) =>
    pipe(
        params,
        decoder.decode,
        E.mapLeft(() => `Please provide a valid movie id (integer)`),
        E.map((searchParams) =>
            pipe(
                TE.Do,
                TE.bind("movie", () => getMovieById(context.moviesRepo)(searchParams.id)),
                TE.bind("torrents", ({movie}) => getTorrentsById(context.torrentsRepo)(movie.imdbId || '')),
                TE.map(({movie, torrents}) => toContent(movie, torrents)),
                TE.mapLeft(errorPage)
            )
        ),
        E.getOrElse((errorMessage) => TE.left(errorPage(errorMessage)))
    )

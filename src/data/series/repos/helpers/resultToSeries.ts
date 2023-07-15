import { EpisodeT } from "../../../../domain/series/entities/episode"
import { SeasonT } from "../../../../domain/series/entities/season"
import { SeriesT } from "../../../../domain/series/entities/series"
import { SeriesGenresT } from "../../../../domain/series/entities/seriesGenres"
import {
    successfullTMDBTVResponse,
    SeasonResponse,
    EpisodeResponse,
    TMDBSeriesAggregateResponse,
} from "../decoders/tmdb.decoders"
import * as t from "io-ts"
import { tmdbSeriesGenres } from "./tmdbGenres"

const defaultPoster: string = ""
const defaultBackground: string = ""

export const toSingleSeries: (
    data: t.TypeOf<typeof successfullTMDBTVResponse>
) => SeriesT = (data) =>
    ({
        id: data.id,
        title: data.original_name || "Unknown Name",
        background: {
            economicQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w300/" + data.backdrop_path
                : defaultBackground,
            bestQuality: data.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.backdrop_path
                : defaultBackground,
        },
        poster: {
            economicQuality: data.poster_path
                ? "https://image.tmdb.org/t/p/w300/" + data.poster_path
                : defaultBackground,
            bestQuality: data.poster_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.poster_path
                : defaultBackground,
        },
        genres: data.genres as SeriesGenresT[],
        overview: data.overview || "",
        series_imdbId: data.external_ids.imdb_id,
        seasons: data.seasons.map((season) => season.season_number) as number[],
    } satisfies SeriesT)

export const toSeason: (data: t.TypeOf<typeof SeasonResponse>) => SeasonT = (
    data
) =>
    ({
        id: data.season_number || 0,
        season_imdbId: "unknown",
        order: `${data.season_number}`,
        background: {
            economicQuality: defaultBackground,
            bestQuality: defaultBackground,
        },
        poster: {
            economicQuality: data.poster_path
                ? "https://image.tmdb.org/t/p/w300/" + data.poster_path
                : defaultBackground,
            bestQuality: data.poster_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.poster_path
                : defaultBackground,
        },
        episodes: data.episodes.map(
            (episode) => episode.episode_number
        ) as number[],
    } satisfies SeasonT)

export const toEpisode: (data: t.TypeOf<typeof EpisodeResponse>) => EpisodeT = (
    data
) =>
    ({
        id: data.episode_number || 0,
        title: data.name || "Unknown Episode Title",
        episode_imdbId: data.external_ids.imdb_id || "unknown",
        order: `${data.episode_number}` || "0",
        background: {
            economicQuality: defaultBackground,
            bestQuality: defaultBackground,
        },
        poster: {
            economicQuality: data.still_path
                ? "https://image.tmdb.org/t/p/w300/" + data.still_path
                : defaultBackground,
            bestQuality: data.still_path
                ? "https://image.tmdb.org/t/p/w1280/" + data.still_path
                : defaultBackground,
        },
        overview: data.overview || "",
    } satisfies EpisodeT)

export const toMultipleSeries: (
    data: t.TypeOf<typeof TMDBSeriesAggregateResponse>
) => SeriesT[] = (data) =>
    data.results.map((entry) => ({
        id: entry.id,
        title: entry.original_name || "Unknown",
        background: {
            economicQuality: entry.backdrop_path
                ? "https://image.tmdb.org/t/p/w300" + entry.backdrop_path
                : defaultBackground,
            bestQuality: entry.backdrop_path
                ? "https://image.tmdb.org/t/p/w1280" + entry.backdrop_path
                : defaultBackground,
        },
        poster: {
            economicQuality: entry.poster_path
                ? "https://image.tmdb.org/t/p/w300" + entry.poster_path
                : defaultBackground,
            bestQuality: entry.poster_path
                ? "https://image.tmdb.org/t/p/w1280" + entry.poster_path
                : defaultBackground,
        },
        genres: entry.genre_ids?.map((id) =>
            tmdbSeriesGenres.find((genre) => genre.id === id)
        ) as SeriesGenresT[],
        overview: entry.overview || "",
        series_imdbId: "unknown",
        seasons: [],
    }))

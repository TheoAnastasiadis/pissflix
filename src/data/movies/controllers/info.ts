import { Controller } from "../../../core/sharedObjects/controller"
import { pipe } from "fp-ts/lib/function"
import { MovieContext } from "../../../domain/movies/controllers/context"
import * as TE from "fp-ts/TaskEither"
import { getMovieById } from "../../../domain/movies/useCases/getMovieById"
import * as t from "io-ts"
import * as R from "fp-ts-routing"
import { infoParams } from "../../../domain/movies/controllers/params"
import { moviePage } from "./helpers/moviePage"
import applicationConfig from "../../../core/config/app.config"

const baseUrl = applicationConfig.externalURL

export const infoView: Controller<MovieContext, t.TypeOf<typeof infoParams>> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.of(Number(params.id)),
            TE.chain(getMovieById(context.moviesRepo)),
            TE.map((movie) =>
                pipe(
                    movie,
                    moviePage(
                        baseUrl +
                            context.matchers.watch.formatter
                                .run(R.Route.empty, {
                                    imdbId: movie.imdbId as string,
                                    player: "remote",
                                    title: movie.title,
                                    episodeImdbId: undefined,
                                })
                                .toString(),
                        baseUrl +
                            context.matchers.watch.formatter
                                .run(R.Route.empty, {
                                    imdbId: movie.imdbId as string,
                                    player: "local",
                                    title: movie.title,
                                    episodeImdbId: undefined,
                                })
                                .toString()
                    )
                )
            )
        ),
}

import { pipe } from "fp-ts/lib/function";
import { View } from "../../../core/sharedObjects/view";
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo";
import { MoviePaths, searchParams } from "../../../domain/movies/views";
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import { searchForMovie } from "../../../domain/movies/useCases/searchForMovie";


export const searchView : View<{ repo: MoviesRepoT}, typeof searchParams> = (context : {repo: MoviesRepoT}) => (decoder: typeof searchParams) => (params: any) => pipe(
    params,
    decoder.decode,
    E.mapLeft(() => `Query params should contain prefix and suffix.`),
    E.map(searchParams => pipe(
        searchParams.prefix,
        O.fromNullable,
        O.chain(O.fromPredicate((prefix) => prefix.length > 0)),
        O.map((query) => searchParams.suffix ? query + searchParams.suffix : query),
        O.map(searchForMovie(context.repo)({page: 0, limit: 20})),
        O.getOrElse(() => TE.left(`Query params should at least contain prefix`)),
    )),
    E.map(TE.map(movies => ({}))), //with results
    E.map(TE.mapLeft(() => ({}))), //with empty results
    E.getOrElse(() => TE.left({})) //with no query
)
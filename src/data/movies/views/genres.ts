// import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
// import { Result } from "../../../core/sharedObjects/result"
// import { View } from "../../../core/sharedObjects/view"
// import { Movie } from "../../../domain/movies/entities/movie"
// import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
// import { getGenres } from "../../../domain/movies/useCases/getGenres"
// import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
// import { resultsPage } from "./helpers/resultsPage"
// import { URLMaker } from "../../../core/sharedObjects/urlMaker"
// import { MovieRelativePaths } from "../../../domain/movies/views"

// export class GenresPage extends View<MsxContentRoot> {
//     repo: IMoviesRepo
//     constructor(
//         externalUrl: string,
//         moviesUrl: string,
//         genresUrl: string,
//         repo: IMoviesRepo
//     ) {
//         super(externalUrl, moviesUrl, genresUrl)
//         this.repo = repo
//     }

//     renderer = async () => {
//         const content = new MsxContentRoot({
//             headline: "Discover Content By Genre",
//             type: "list",
//         })

//         const genresResult = getGenres(this.repo)
//         if (genresResult.isSuccess) {
//             const genres = genresResult.getValue() || []
//             const movieResults: Result<Movie[]>[] = await Promise.all(
//                 (genres || []).map((genre) =>
//                     getMoviesByGenre(this.repo, genre, { page: 0, limit: 5 })
//                 )
//             )
//             for (let idx = 0; idx < genres?.length; idx++) {
//                 if (movieResults[idx].isSuccess) {
//                     const movies = movieResults[idx].getValue() || []
//                     content.addPage(
//                         resultsPage(
//                             genres[idx].name as string,
//                             "", //genres subtitle
//                             movies,
//                             URLMaker.make(
//                                 this.externalUrl,
//                                 this.groupUrl,
//                                 MovieRelativePaths.resultsPanel,
//                                 {
//                                     type: `genre:${genres[idx].uniqueId}`,
//                                     page: 0,
//                                 }
//                             )
//                         )
//                     )
//                 } //if some genre didn't return, we just skip it.
//             }
//         } else {
//             return new Result<MsxContentRoot>(false, genresResult.errorValue())
//         }

//         return new Result<MsxContentRoot>(true, undefined, content)
//     }
// }

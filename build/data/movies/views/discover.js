"use strict";
// import {
//     MsxContentItem,
//     MsxContentPage,
//     MsxContentRoot,
// } from "../../../core/msxUI/contentObjects"
// import { Result } from "../../../core/sharedObjects/result"
// import { URLMaker } from "../../../core/sharedObjects/urlMaker"
// import { View } from "../../../core/sharedObjects/view"
// import { Movie } from "../../../domain/movies/entities/movie"
// import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
// import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
// import { MovieRelativePaths } from "../../../domain/movies/views"
// import { resultsPage } from "./helpers/resultsPage"
// export class DiscoverPage extends View<MsxContentRoot> {
//     repo: IMoviesRepo
//     constructor(
//         externalUrl: string,
//         moviesUrl: string,
//         discoverPageUrl: string,
//         moviesRepo: IMoviesRepo
//     ) {
//         super(externalUrl, moviesUrl, discoverPageUrl)
//         this.repo = moviesRepo
//     }
//     renderer = async () => {
//         const dailyTrendingMovies = await getTrendingMovies(this.repo, "day", {
//             page: 0,
//             limit: 5,
//         })
//         const weeklyTrendingMovies = await getTrendingMovies(
//             this.repo,
//             "week",
//             {
//                 page: 0,
//                 limit: 5,
//             }
//         )
//         const content = new MsxContentRoot({
//             headline: "Discover Popular Content",
//             type: "list",
//         })
//         if (dailyTrendingMovies.isSuccess) {
//             const movies = dailyTrendingMovies.getValue() || []
//             content.addPage(
//                 resultsPage(
//                     "Movies Trending Today", //title
//                     "", //subtitle
//                     movies,
//                     URLMaker.make(
//                         this.externalUrl,
//                         this.groupUrl,
//                         MovieRelativePaths.resultsPanel,
//                         { type: "day", page: 0 }
//                     )
//                 )
//             )
//         } else {
//             console.error(dailyTrendingMovies.errorValue())
//         }
//         if (weeklyTrendingMovies.isSuccess) {
//             const movies = weeklyTrendingMovies.getValue() || []
//             content.addPage(
//                 resultsPage(
//                     "Movies Trending This Week",
//                     "",
//                     movies,
//                     URLMaker.make(
//                         this.externalUrl,
//                         this.groupUrl,
//                         MovieRelativePaths.resultsPanel,
//                         { type: "week", page: 0 }
//                     )
//                 )
//             )
//         } else {
//             console.error(weeklyTrendingMovies.errorValue())
//         }
//         return new Result<MsxContentRoot>(true, undefined, content)
//     }
// }

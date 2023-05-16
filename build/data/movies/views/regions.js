"use strict";
// import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
// import { regions } from "../../../core/sharedObjects/regions"
// import { Result } from "../../../core/sharedObjects/result"
// import { URLMaker } from "../../../core/sharedObjects/urlMaker"
// import { View } from "../../../core/sharedObjects/view"
// import { Movie } from "../../../domain/movies/entities/movie"
// import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
// import { getMoviesByRegion } from "../../../domain/movies/useCases/getMoviesByRegion"
// import { MovieRelativePaths } from "../../../domain/movies/views"
// import { resultsPage } from "./helpers/resultsPage"
// export class RegionsPage extends View<MsxContentRoot> {
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
//             headline: "Discover Content From Across The World",
//             type: "list",
//         })
//         //const regions: Region[]
//         const movieResults: Result<Movie[]>[] = await Promise.all(
//             regions.map((region) =>
//                 getMoviesByRegion(this.repo, region, { limit: 5, page: 0 })
//             )
//         )
//         for (const idx in regions) {
//             if (movieResults[idx].isSuccess) {
//                 const movies = movieResults[idx].getValue() || []
//                 content.addPage(
//                     resultsPage(
//                         regions[idx].name,
//                         "", //regions subtitle
//                         movies,
//                         URLMaker.make(
//                             this.externalUrl,
//                             this.groupUrl,
//                             MovieRelativePaths.resultsPanel,
//                             {
//                                 type: `region:${regions[idx].name}`,
//                                 page: 0,
//                             }
//                         )
//                     )
//                 )
//             } //if some region didn't return, we just skip it.
//         }
//         return new Result<MsxContentRoot>(true, undefined, content)
//     }
// }

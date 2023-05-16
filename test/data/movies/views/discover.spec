// import {
//     MsxContentPage,
//     MsxContentRoot,
// } from "../../../../src/core/msxUI/contentObjects"
// import { URLMaker } from "../../../../src/core/sharedObjects/urlMaker"
// import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
// import { movieViews } from "../../../../src/data/movies/views/"
// import { IMoviesRepo } from "../../../../src/domain/movies/repos/movies.repo"
// import { MovieRelativePaths } from "../../../../src/domain/movies/views"

// const repo: IMoviesRepo = new TMDBRepo()

// describe("Discover page", () => {
//     test("returns proper discover page", async () => {
//         const view = movieViews(repo).discover
//         expect(view.requiredParams).toBeUndefined()
//         const result = await view.render()
//         expect(result.isSuccess).toBeTruthy()
//         let content = result.getValue() as MsxContentRoot
//         console.dir(content)
//         expect((content as MsxContentRoot).pages).toHaveLength(2) //daily discover + weekly discover
//         expect((content.pages as Array<MsxContentPage>)[0].items).toHaveLength(
//             7
//         )
//         if (
//             content.pages &&
//             content.pages[0] &&
//             content.pages[0].items &&
//             content.pages[0].items[6]
//         ) {
//             expect(content.pages[0].items[6].action).toEqual(
//                 `panel:${URLMaker.make(
//                     view.externalUrl,
//                     view.groupUrl,
//                     MovieRelativePaths.resultsPanel,
//                     { page: 0, type: "day" }
//                 )}`
//             ) //daily trending panel
//         }
//         if (
//             content.pages &&
//             content.pages[1] &&
//             content.pages[1].items &&
//             content.pages[1].items[6]
//         ) {
//             expect(content.pages[1].items[6].action).toEqual(
//                 `panel:${URLMaker.make(
//                     view.externalUrl,
//                     view.groupUrl,
//                     MovieRelativePaths.resultsPanel,
//                     { page: 0, type: "week" }
//                 )}`
//             ) //weekly trending panel
//         }
//     })
// })

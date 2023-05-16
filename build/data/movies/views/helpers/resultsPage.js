"use strict";
// import {
//     MsxContentPage,
//     MsxContentItem,
// } from "../../../../core/msxUI/contentObjects"
// import { Movie } from "../../../../domain/movies/entities/movie"
// export const resultsPage = (
//     headline: string,
//     subtitle: string,
//     movies: Movie[],
//     panelUrl: string
// ) => {
//     const page = new MsxContentPage({
//         background: movies[0].background.getHighestQuality(),
//         headline,
//     })
//     page.addItem(
//         new MsxContentItem({
//             //headline
//             titleHeader: headline,
//             titleFooter: subtitle,
//             layout: "0,0,12,1",
//             type: "space",
//         })
//     )
//     for (let i = 0; i < movies.length; i++) {
//         page.addItem(
//             new MsxContentItem({
//                 //movie posters
//                 titleHeader: movies[i].title,
//                 titleFooter: movies[i].release.getFullYear().toString(),
//                 image: movies[i].poster.getDefaultQuality(),
//                 layout: `${i * 2},1,12,2`,
//                 type: "separate",
//             })
//         )
//     }
//     page.addItem(
//         new MsxContentItem({
//             //show more button
//             layout: `10,1,12,2`,
//             type: "separate",
//             icon: "more-horiz",
//             action: `panel:${panelUrl}`,
//         })
//     )
//     return page
// }

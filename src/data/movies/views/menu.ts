// import { MsxMenu, MsxMenuItem } from "../../../core/msxUI/menuObject"
// import { Result } from "../../../core/sharedObjects/result"
// import { URLMaker } from "../../../core/sharedObjects/urlMaker"
// import { View } from "../../../core/sharedObjects/view"
// import { MovieRelativePaths } from "../../../domain/movies/views"

// export class MainMovieMenu extends View<MsxMenu> {
//     constructor(externalUrl: string, moviesUrl: string, viewUrl: string) {
//         super(externalUrl, moviesUrl, viewUrl)
//     }
//     renderer = () => {
//         const menu = new MsxMenu({
//             headline: "Movies",
//         })

//         menu.addItem(
//             new MsxMenuItem({
//                 id: "0",
//                 type: "default",
//                 extensionIcon: "auto-awesome",
//                 label: "Your Content",
//                 data: URLMaker.make(
//                     this.externalUrl,
//                     this.groupUrl,
//                     MovieRelativePaths.discover
//                 ),
//             })
//         )

//         menu.addItem(
//             new MsxMenuItem({
//                 id: "1",
//                 type: "separator",
//                 label: "Discover by",
//             })
//         )

//         menu.addItem(
//             new MsxMenuItem({
//                 id: "2",
//                 type: "default",
//                 extensionIcon: "auto-awesome",
//                 label: "Genre",
//                 data: URLMaker.make(
//                     this.externalUrl,
//                     this.groupUrl,
//                     MovieRelativePaths.genres
//                 ),
//             })
//         )

//         menu.addItem(
//             new MsxMenuItem({
//                 id: "3",
//                 type: "default",
//                 extensionIcon: "auto-awesome",
//                 label: "Era",
//                 data: URLMaker.make(
//                     this.externalUrl,
//                     this.groupUrl,
//                     MovieRelativePaths.eras
//                 ),
//             })
//         )

//         menu.addItem(
//             new MsxMenuItem({
//                 id: "4",
//                 type: "default",
//                 extensionIcon: "auto-awesome",
//                 label: "Region",
//                 data: URLMaker.make(
//                     this.externalUrl,
//                     this.groupUrl,
//                     MovieRelativePaths.regions
//                 ),
//             })
//         )

//         return new Result<MsxMenu>(true, undefined, menu)
//     }
// }

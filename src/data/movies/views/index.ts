// import { MsxMenu } from "../../../core/msxUI/menuObject"
// import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
// import {
//     MovieViews,
//     infoParams,
//     panelParams,
// } from "../../../domain/movies/views"

// import * as t from "io-ts"

// const menuView = {
//     _name: "Movies Menu",
//     render: (repo: MoviesRepoT) => (params: any) => new MsxMenu({}),
// }

// const PanelView = {
//     _name: "Movie Results Panel",
//     render: (repo: MoviesRepoT) => (params: any) => new MsxMenu({}),
// }

// const movieViews: MovieViews = {
//     menu: {
//         relativePath: "menu/",
//         view: menuView,
//         params: t.type({}),
//     },
//     resultsPanel: {
//         relativePath: "results_panel/",
//         view: PanelView,
//         params: t.union([
//             t.partial(panelParams.optional),
//             t.type(panelParams.mandatory),
//         ]),
//     },
//     info: {
//         relativePath: "info/",
//         view: menuView,
//         params: t.type(infoParams),
//     },
// }

// export { movieViews }

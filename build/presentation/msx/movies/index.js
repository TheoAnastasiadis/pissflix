"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMoviesRegistry = void 0;
const movies_routes_1 = require("../../../domain/movies/routes/movies.routes");
const moviesMenu_1 = require("./components/moviesMenu");
const moviesRoutes_enum_1 = require("./components/moviesRoutes.enum");
function createMoviesRegistry(applicationUrl) {
    const msxMoviesRegistry = new movies_routes_1.MoviesViewsRegistry(applicationUrl);
    msxMoviesRegistry.registerRoute(moviesRoutes_enum_1.MoviesRoutes.MENU, moviesMenu_1.MsxMoviesMenu);
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    // msxMoviesCotrnoler.registerRoute()
    return msxMoviesRegistry;
}
exports.createMoviesRegistry = createMoviesRegistry;

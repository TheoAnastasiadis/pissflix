import { Request, Response } from "express-serve-static-core"
import { ControlerFunction } from "../../../shared/Objects/controlerFunction"
import { Movie } from "../entities/movie.entity"

export interface MoviesControler {
    routes: [string, Function][]
    registerRoute(path: string, controler: ControlerFunction<any>): void
}

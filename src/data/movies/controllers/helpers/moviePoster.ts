import moment from "moment"
import { MsxContentItem } from "../../../../core/msxUI/contentObjects"
import { MovieT } from "../../../../domain/movies/entities/movie"

export const moviePoster: (
    movie: MovieT,
    infoPage: string
) => MsxContentItem = (movie, infoPage) => ({
    titleHeader: movie.title,
    titleFooter: moment.unix(movie.release).format("YYYY"),
    action: `content:${infoPage}`,
})

import { Movie } from "../../../../src/modules/movies/entities/movie.entity"
import { Image } from "../../../../src/shared/Objects/image"

export const image: Image = {
    baseURL: "example.com",
    filePath: "/image.jpg" as string,
    variations: undefined,
    getDefaultQuality: function (): string {
        return ((this.baseURL as string) + this.filePath) as string
    },
    getHighestQuality: function (): string {
        return this.getDefaultQuality() as string
    },
    getLowestQuality: function (): string {
        return this.getDefaultQuality() as string
    },
}

export const exampleMovie: Movie = {
    adult: false,
    background: image,
    id: 123456,
    overview: "Overview",
    popularity: 100,
    poster: image,
    release: new Date("2020"),
    runtime: 100,
    tagline: "Tagline",
    imdbId: "tt1234567",
    status: "Status",
    rating: 100,
    title: "Title",
    genres: [
        {
            name: "Genre",
            uniqueId: 100,
        },
    ],
    languages: [
        {
            name: "Language",
            isoCode: "ln",
        },
    ],
    countries: [
        {
            name: "Country",
            isoCode: "co",
        },
    ],
}

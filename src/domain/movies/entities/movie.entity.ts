import { Image } from "../../../core/sharedObjects/image"
import { Country, Genre, Language, Status } from "./subentities"

type MovieProps = {
    adult: Boolean
    background: Image
    genres: Genre[]
    id: Number
    imdbId: `tt${number}` | null
    languages: Language[]
    title: String
    overview: String
    popularity: Number
    poster: Image
    countries: Country[]
    release: Date
    runtime: Number
    status: Status
    tagline: String
    rating: Number
}

export class Movie {
    public adult: Boolean
    public background: Image
    public id: Number
    public overview: String
    public popularity: Number
    public poster: Image
    public release: Date
    public runtime: Number
    public tagline: String
    public imdbId: String | null
    public status: String
    public rating: Number
    public title: String
    public genres: Genre[]
    public languages: Language[]
    public countries: Country[]
    public constructor(props: MovieProps) {
        this.adult = props.adult
        this.background = props.background
        this.id = props.id
        this.overview = props.overview
        this.popularity = props.popularity
        this.poster = props.poster
        this.release = props.release
        this.runtime = props.runtime
        this.tagline = props.tagline
        this.imdbId = props.imdbId
        this.status = props.status
        this.rating = props.rating
        this.title = props.title
        this.genres = props.genres
        this.languages = props.languages
        this.countries = props.countries
    }
}

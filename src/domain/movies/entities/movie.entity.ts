import { Image } from "../../../core/sharedObjects/image"
import { Country, Genre, Language, Status } from "./subentities"

type MovieProps = {
    adult: Boolean
    background: Image
    genres: Genre[]
    id: number
    imdbId: `tt${number}` | null
    languages: Language[]
    title: string
    overview: string
    popularity: number
    poster: Image
    countries: Country[]
    release: Date
    runtime: number
    status: Status
    tagline: string
    rating: number
}

export class Movie {
    public adult: Boolean
    public background: Image
    public id: number
    public overview: string
    public popularity: number
    public poster: Image
    public release: Date
    public runtime: number
    public tagline: string
    public imdbId: string | null
    public status: string
    public rating: number
    public title: string
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

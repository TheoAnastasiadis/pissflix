import * as dotenv from "dotenv"
dotenv.config()

export default {
    externalUrl: process.env.EXTERNAL_URL || "https://example.com",
    movieUrl: process.env.MOVIE_URL || "movies",
}

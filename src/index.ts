import express from "express"
import { movieRouter } from "./domain/movies/routes"
import { createMoviesConfig } from "./data/movies/routes/createMoviesConfig"

const PORT = 8080
const EXTERNAL_URL = ""

const app = express()

//movies
const movieConfig = createMoviesConfig(EXTERNAL_URL)
app.use(movieRouter(movieConfig))

app.listen(PORT, () => {
    console.log(`[${Date().toLocaleLowerCase()}] App runnig on port ${PORT}.`)
})

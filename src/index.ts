import express from 'express'
import { movieRouter } from './domain/movies/routes'
import { movieConfig } from './data/movies/routes/movies.config'

const PORT = 8080
const EXTERNAL_URL = ''

const app =  express()

//movies
app.use(movieRouter(movieConfig(EXTERNAL_URL)))

app.listen(PORT, () => {
    console.log(`[${Date().toLocaleLowerCase()}]App runnig on port ${PORT}.`)
})

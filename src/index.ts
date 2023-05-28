import express from "express"
import { expressAdaptor, expressSetup } from "./data/common/setup"
import { movieSetup } from "./data/movies/setup"

const PORT = 8080
const EXTERNAL_URL = ""
const app = express()
const router = express.Router()
const adaptor = expressAdaptor
const setupFunction = expressSetup(router)

//router setup
movieSetup(setupFunction, adaptor, EXTERNAL_URL)


app.use(router)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`)
})

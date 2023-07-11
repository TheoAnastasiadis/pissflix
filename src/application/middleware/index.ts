import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"

//Middleware
const corsOptions = {
    origin: /https?:\/\/msx\.benzac\.de/,
    optionsSuccessStatus: 200,
}

export const middleware = [
    morgan("tiny"),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(corsOptions),
]

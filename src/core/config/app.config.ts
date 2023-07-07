import * as dotenv from "dotenv"
dotenv.config()

export default {
    externalURL: process.env.EXTERNAL_URL,
    staticPath: process.env.STATIC_PATH,
}

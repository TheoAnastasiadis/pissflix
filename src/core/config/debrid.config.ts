import * as dotenv from "dotenv"
dotenv.config()

export default {
    realDebridApiKEY: process.env.REAL_DEBRID_API_KEY,
    debridLinkApiKey: process.env.DEBRID_LINK_API_KEY,
}

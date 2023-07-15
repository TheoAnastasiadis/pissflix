import {
    EpisodeResponse,
    SeasonResponse,
    TMDBSeriesAggregateResponse,
    successfullTMDBTVResponse,
} from "../../../../../src/data/series/repos/decoders/tmdb.decoders"

describe("TMDB Series Decoders", () => {
    test("aggregate response", () => {
        const validPayload = {
            page: 1,
            results: [
                {
                    backdrop_path: "/aWPhMZ0P2DyfWB7k5NXhGHSZHGC.jpg",
                    first_air_date: "2023-05-08",
                    genre_ids: [18, 80, 10766],
                    id: 209265,
                    name: "Terra e Paixão",
                    origin_country: ["BR"],
                    original_language: "pt",
                    original_name: "Terra e Paixão",
                    overview: "",
                    popularity: 3233.471,
                    poster_path: "/voaKRrYExZNkf1E4FZExU7fTd8w.jpg",
                    vote_average: 5.8,
                    vote_count: 37,
                },
            ],
            total_pages: 7606,
            total_results: 152101,
        }
        const invalidPayload = {}

        expect(TMDBSeriesAggregateResponse.decode(validPayload)).toHaveProperty(
            "right"
        )
        expect(
            TMDBSeriesAggregateResponse.decode(invalidPayload)
        ).toHaveProperty("left")
    })

    test("episode response", () => {
        const validPayload = {
            air_date: "2021-09-24",
            crew: [
                {
                    job: "Writer",
                    department: "Writing",
                    credit_id: "614e0843124c8d00624058a1",
                    adult: false,
                    gender: 2,
                    id: 507,
                    known_for_department: "Writing",
                    name: "Josh Friedman",
                    original_name: "Josh Friedman",
                    popularity: 3.356,
                    profile_path: "/8zhRXGngBrijgBE3SDXxeOfbaOO.jpg",
                },
            ],
            episode_number: 1,
            guest_stars: [
                {
                    character: "Bayla",
                    credit_id: "615163c572d8550043878177",
                    order: 500,
                    adult: false,
                    gender: 1,
                    id: 2510036,
                    known_for_department: "Acting",
                    name: "Jade Harrison",
                    original_name: "Jade Harrison",
                    popularity: 4.289,
                    profile_path: "/gRh3aoDHtL6pczcG8Tc5ll6yyge.jpg",
                },
            ],
            name: "The Emperor's Peace",
            overview:
                "Gaal Dornick leaves her life in Synnax behind when the galaxy’s greatest mathematician, Hari Seldon, invites her to Trantor.",
            id: 2317130,
            production_code: "",
            runtime: 70,
            season_number: 1,
            still_path: "/eYwAsUtxMxyGv1qJ9asMftaqjUE.jpg",
            vote_average: 8.128,
            vote_count: 39,
            external_ids: {
                imdb_id: "tt8887436",
                freebase_mid: null,
                freebase_id: null,
                tvdb_id: 8287162,
                tvrage_id: null,
                wikidata_id: null,
            },
        }
        const invalidPayload = {}

        expect(EpisodeResponse.decode(validPayload)).toHaveProperty("right")
        expect(EpisodeResponse.decode(invalidPayload)).toHaveProperty("left")
    })

    test("season response", () => {
        const validPayload = {
            _id: "53c8dbdc0e0a26649c0017a2",
            air_date: "2014-09-25",
            episodes: [
                {
                    air_date: "2014-09-25",
                    episode_number: 1,
                    id: 996909,
                    name: "Pilot",
                    overview:
                        "A ruthless defense attorney and no-nonsense law professor at a Philadelphia university selects a group of her best students to work at her firm.",
                    production_code: "",
                    runtime: 45,
                    season_number: 1,
                    show_id: 61056,
                    still_path: "/evze0uVSUdXKmFlSXQz7ikTfjvx.jpg",
                    vote_average: 7.731,
                    vote_count: 25,
                    crew: [
                        {
                            job: "Director",
                            department: "Directing",
                            credit_id: "56366a429251414ad80198e7",
                            adult: false,
                            gender: 2,
                            id: 166757,
                            known_for_department: "Directing",
                            name: "Michael Offer",
                            original_name: "Michael Offer",
                            popularity: 1.758,
                            profile_path: null,
                        },
                    ],
                    guest_stars: [
                        {
                            character: "Oliver Hampton",
                            credit_id: "5510e2839251415c3200099c",
                            order: 8,
                            adult: false,
                            gender: 2,
                            id: 1444791,
                            known_for_department: "Acting",
                            name: "Conrad Ricamora",
                            original_name: "Conrad Ricamora",
                            popularity: 10.639,
                            profile_path: "/75eINvBtaqf2lsXzi7PIU4lo9mE.jpg",
                        },
                    ],
                },
            ],
            name: "Season 1",
            overview: "",
            id: 61882,
            poster_path: "/lub62zywrVzwwdcEVu6FnejIjAI.jpg",
            season_number: 1,
            vote_average: 8.2,
        }
        const invalidPayload = {}

        expect(SeasonResponse.decode(validPayload)).toHaveProperty("right")
        expect(SeasonResponse.decode(invalidPayload)).toHaveProperty("left")
    })

    test("single info response", () => {
        const validPayload = {
            adult: false,
            backdrop_path: "/b017s0M897KyqrXmtyAixo4vxxu.jpg",
            created_by: [
                {
                    id: 19274,
                    credit_id: "577d2f3d9251415d980008d3",
                    name: "Seth Rogen",
                    gender: 2,
                    profile_path: "/2dPFskUtoiG0xafsSEGl9Oz4teA.jpg",
                },
            ],
            episode_run_time: [60, 45],
            first_air_date: "2016-05-22",
            genres: [
                {
                    id: 18,
                    name: "Drama",
                },
            ],
            homepage: "http://www.amc.com/shows/preacher",
            id: 64230,
            in_production: false,
            languages: ["en"],
            last_air_date: "2019-09-29",
            last_episode_to_air: {
                id: 1867328,
                name: "End of the World",
                overview:
                    "The fate of the world is decided as the long journey of a preacher and his friends comes to an end.",
                vote_average: 8.3,
                vote_count: 3,
                air_date: "2019-09-29",
                episode_number: 10,
                production_code: "",
                runtime: 55,
                season_number: 4,
                show_id: 64230,
                still_path: "/iKdAiwtiUaqX0vRH9N2vri3dEWS.jpg",
            },
            name: "Preacher",
            next_episode_to_air: null,
            networks: [
                {
                    id: 174,
                    logo_path: "/alqLicR1ZMHMaZGP3xRQxn9sq7p.png",
                    name: "AMC",
                    origin_country: "US",
                },
            ],
            number_of_episodes: 43,
            number_of_seasons: 4,
            origin_country: ["US"],
            original_language: "en",
            original_name: "Preacher",
            overview:
                "A preacher sets out on a mission to make the almighty himself confess his sin of abandoning the world. With his best friend Cassidy, an alcoholic Irish vampire, his love Tulip, a red blooded gun towing Texan, and the power of genesis, an unholy child born from an angel and a devil, Jesse gives up everything to set the world straight with its creator.",
            popularity: 35.104,
            poster_path: "/ey1WQajA25E5sFGHSApcqSWUSEc.jpg",
            production_companies: [
                {
                    id: 16615,
                    logo_path: "/dbxHaOtibTKvP6dUMRYdwUOULgY.png",
                    name: "Point Grey Pictures",
                    origin_country: "US",
                },
            ],
            production_countries: [
                {
                    iso_3166_1: "US",
                    name: "United States of America",
                },
            ],
            seasons: [
                {
                    air_date: "2016-05-22",
                    episode_count: 14,
                    id: 77303,
                    name: "Specials",
                    overview: "",
                    poster_path: "/9WHTgr0aTBWpetdpEWqvCjlly06.jpg",
                    season_number: 0,
                    vote_average: 0,
                },
            ],
            spoken_languages: [
                {
                    english_name: "English",
                    iso_639_1: "en",
                    name: "English",
                },
            ],
            status: "Ended",
            tagline: "IT all goes to hell in the end.",
            type: "Scripted",
            vote_average: 7.5,
            vote_count: 975,
        }
        const invalidPayload = {}

        expect(successfullTMDBTVResponse.decode(validPayload)).toHaveProperty(
            "right"
        )
        expect(successfullTMDBTVResponse.decode(invalidPayload)).toHaveProperty(
            "left"
        )
    })
})

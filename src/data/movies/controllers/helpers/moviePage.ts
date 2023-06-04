import moment from "moment"
import { MsxContentRoot } from "../../../../core/msxUI/contentObjects"
import { MovieT } from "../../../../domain/movies/entities/movie"

export const moviePage: (
    remoteWatchPath: string,
    localWatchPath: string
) => (movie: MovieT) => MsxContentRoot =
    (remoteWatchPath, localWatchPath) => (movie) => ({
        type: "list",
        pages: [
            {
                background: movie.background.bestQuality,
                items: [
                    {
                        layout: "0,0,4,6",
                        type: "space",
                        image: movie.poster.bestQuality,
                        imageFiller: "smart",
                    },
                    {
                        layout: "4,0,8,1",
                        type: "space",
                        title: `${movie.title} (${moment
                            .unix(movie.release)
                            .format("YYYY")})`,
                        titleFooter: movie.tagline,
                        alignment: "center",
                    },
                    {
                        layout: "4,1,8,1",
                        offset: "0.5,0,-0.5,0",
                        title: "{txt:msx-white-soft:Description}",
                        titleFooter: `{txt:msx-white:${movie.overview}}`,
                        type: "space",
                    },
                    {
                        layout: "4,2,8,1",
                        offset: "0.5,0,-0.5,0",
                        title: "{txt:msx-white-soft:Info}",
                        titleFooter: `{ico:timelapse}{txt:msx-white:${
                            movie.runtime
                        }'}{tb}{ico:style}{txt:msx-white:${
                            movie.genres.length > 0
                                ? movie.genres
                                      .map((genre) => genre.name)
                                      .reduce((p, c) => p + ", " + c)
                                : ""
                        }}{tb}{ico:volume-down-alt}{txt:msx-white:${
                            movie.languages.length > 0
                                ? movie.languages
                                      .map(String)
                                      .reduce((p, c) => p + ", " + c)
                                : ""
                        }}{tb}{ico:language}{txt:msx-white:${
                            movie.countries.length > 0
                                ? movie.countries
                                      .map(String)
                                      .reduce((p, c) => p + ", " + c)
                                : ""
                        }}`,
                        type: "space",
                    },
                    {
                        layout: "4,3,3,1",
                        offset: "0.5,0,0,0",
                        type: "default",
                        label: "Watch Trailer{tb}{ico:smart-display}",
                        enable: false,
                    },
                    {
                        layout: "4,4,3,1",
                        offset: "0.5,0,0,0",
                        type: "default",
                        label: "Play Locally{tb}{ico:local-play}",
                        action: `content:${localWatchPath}`,
                    },
                    {
                        layout: "7,4,3,1",
                        offset: "0.5,0,0,0",
                        type: "default",
                        label: "Play Remotely{tb}{ico:play-circle}",
                        action: `content:${remoteWatchPath}`,
                    },
                ],
            },
        ],
    })

import * as t from "io-ts"

export const succesfullSearchResponse = t.type({
    total_pages: t.number,
    total_count: t.number,
    per_page: t.number,
    page: t.number,
    data: t.array(
        t.type({
            id: t.string,
            type: t.string,
            attributes: t.type({
                subtitle_id: t.string,
                language: t.string,
                download_count: t.number,
                new_download_count: t.number,
                hearing_impaired: t.boolean,
                hd: t.boolean,
                fps: t.number,
                votes: t.number,
                ratings: t.number,
                from_trusted: t.boolean,
                foreign_parts_only: t.boolean,
                upload_date: t.string,
                ai_translated: t.boolean,
                machine_translated: t.boolean,
                release: t.string,
                comments: t.string,
                legacy_subtitle_id: t.number,
                uploader: t.type({
                    uploader_id: t.number,
                    name: t.string,
                    rank: t.string,
                }),
                feature_details: t.type({
                    feature_id: t.number,
                    feature_type: t.string,
                    year: t.number,
                    title: t.string,
                    movie_name: t.string,
                    imdb_id: t.number,
                    tmdb_id: t.number,
                }),
                url: t.string,
                related_links: t.array(
                    t.type({
                        label: t.string,
                        url: t.string,
                        img_url: t.string,
                    })
                ),
                files: t.array(
                    t.type({
                        file_id: t.number,
                        cd_number: t.number,
                        file_name: t.string,
                    })
                ),
            }),
        })
    ),
})

export const SuccesfullDownloadResponse = t.type({
    link: t.string,
    file_name: t.string,
    requests: t.number,
    remaining: t.number,
    message: t.string,
    reset_time: t.string,
    reset_time_utc: t.string,
})

export const unsuccesfullResponse = t.type({
    errors: t.array(t.string),
    status: t.number,
})

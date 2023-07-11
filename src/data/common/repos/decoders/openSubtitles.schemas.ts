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
            attributes: t.union([
                t.any,
                t.type({
                    files: t.array(
                        t.partial({
                            file_id: t.number,
                            cd_number: t.number,
                            file_name: t.string,
                        })
                    ),
                }),
            ]),
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

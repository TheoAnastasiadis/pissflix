import * as t from "io-ts"

export const getAllResponse = t.type({
    status: t.boolean,
    pagination: t.type({ page: t.number, per_page: t.number, total: t.number }),
    data: t.array(
        t.type({
            id: t.number,
            source: t.union([t.null, t.string]),
            source_id: t.union([t.null, t.string]),
            source_published_day: t.union([t.null, t.number]),
            source_published_month: t.union([t.null, t.number]),
            source_published_year: t.union([t.null, t.number]),
            title: t.string,
            title_alphabet: t.union([t.null, t.string]),
            embed_url: t.string,
            has_preview: t.union([t.null, t.boolean]),
            preview_url: t.union([t.null, t.string]),
            default_thumb_url: t.union([t.null, t.string]),
            other_thumbs_url: t.union([t.null, t.array(t.string)]),
            rating: t.union([t.null, t.number]),
            duration: t.union([t.null, t.number]),
            views_count: t.union([t.null, t.number]),
            votes_count: t.union([t.null, t.number]),
            votes_up: t.union([t.null, t.number]),
            votes_down: t.union([t.null, t.number]),
            votes_pct: t.union([t.null, t.number]),
            is_best: t.union([t.null, t.boolean]),
            sections: t.union([t.null, t.array(t.string)]),
            categories: t.union([t.null, t.array(t.number)]),
        })
    ),
})

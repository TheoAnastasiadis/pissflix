import { paginationParams } from "../../../../../core/sharedObjects/paginationHandler"

const TMDB_RESULTS_LIMIT = 20 //this is hardcoded into the API
const TMDB_MAX_PAGES = 1000 // this is hardcoded into the API
const currentTMDBResultsPage = (
    customPageNumber: number,
    customLimitNumber: number
): number => {
    return (
        Math.floor(
            ((customPageNumber - 1) * customLimitNumber) / TMDB_RESULTS_LIMIT
        ) + 1
    ) //TMDB pages are 1-indexed
}
const currentTMDBResult = (
    customPageNumber: number,
    customLimitNumber: number
): number => {
    return Math.floor(
        ((customPageNumber - 1) * customLimitNumber) % TMDB_RESULTS_LIMIT
    )
}

export const paginationParser: (
    pagination: paginationParams
) => [number, number] = (pagination) => {
    const page = Math.min(
        currentTMDBResultsPage(pagination.page, pagination.limit),
        TMDB_MAX_PAGES
    )
    const startIdx =
        Math.min(
            currentTMDBResult(pagination.page, pagination.limit),
            TMDB_RESULTS_LIMIT
        ) - 1 //this will not work well for limits > TMDB_RESULTS_LIMIT
    return [page, startIdx]
}

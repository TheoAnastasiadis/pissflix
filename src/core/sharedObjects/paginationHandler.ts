export type paginationParams = {
    /**
     *The idx of the results page (staring from 1)
     * @type {number}
     */
    page: number
    /**
     *The number of results per page. This will not always be fulffiled.
     * @type {number}
     */
    limit: number
}

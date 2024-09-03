export interface Page <T> {
    items: Array<T>,
    limit: number,
    offset: number,
    total: number,
}


export interface Pagination<T> extends Page<T> {
    totalPages: number,
    pageNumber: number
}


function totalPages(limit: number, total: number): number {
    return Math.ceil(total / limit) + 1
}

function hasPreviousPage(pageNumber: number): boolean {
    return pageNumber > 1
}

function hasNextPage(pageNumber: number, totalPages: number): boolean {
    return pageNumber < totalPages
}

function pageNumber(limit: number, offset: number): number {
    return (offset / limit) + 1
}

export const paginationService = {
    totalPages: totalPages,
    hasPreviousPage: hasPreviousPage,
    hasNextPage: hasNextPage,
    pageNumber: pageNumber
}
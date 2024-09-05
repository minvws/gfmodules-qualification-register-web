export interface Page <T> {
    items: Array<T>,
    limit: number,
    offset: number,
    total: number,
}

export interface Pagination<T> extends Page<T> {
    totalPages: number,
    pageNumber: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

function totalPages(limit: number, total: number): number {
    const results = Math.ceil(total / limit);
    return results > 0 ? results : 1;
}

function hasPreviousPage(pageNumber: number): boolean {
    return pageNumber > 1;
}

function hasNextPage(pageNumber: number, totalPages: number): boolean {
    return pageNumber < totalPages
}

function pageNumber(limit: number, offset: number): number {
    return (offset / limit) + 1;
}

export const paginationService = {
    totalPages: totalPages,
    hasPreviousPage: hasPreviousPage,
    hasNextPage: hasNextPage,
    pageNumber: pageNumber,
}
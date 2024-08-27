export interface Page <T> {
    items: Array<T>,
    total: Number,
    offset: Number,
    limit: Number
}
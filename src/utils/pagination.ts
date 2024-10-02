import type { LocationQueryValue } from 'vue-router';

export const parsePaginationPage = (page: LocationQueryValue | LocationQueryValue[]): number|undefined => {
  if (page === undefined || page === null) {
    return undefined;
  }
  if (typeof page !== 'string') {
    return undefined;
  }
  const pageValue = parseInt(page)
  if (pageValue < 1) {
    return undefined;
  }

  return pageValue;
}

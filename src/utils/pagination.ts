import type { LocationQueryValue } from 'vue-router';

export const parsePaginationPage = (page: LocationQueryValue | LocationQueryValue[]): number|undefined => {
  if (!page || typeof page !== 'string' ) {
    return; 
  }
  const pageValue = parseInt(page)
  if (pageValue < 1) {
    return undefined;
  }

  return pageValue;
}

import type { Application } from '../types';

export const useApplicationSearch = (
  searchValue: string,
  collection: Application[] | undefined
) => {
  if (!collection) return [];

  const bySearchField = (p: Application) =>
    p.student.fullName.toLowerCase().includes(searchValue.toLowerCase());
  const applicationsToShow =
    searchValue && collection ? collection.filter(bySearchField) : collection;

  return applicationsToShow;
};

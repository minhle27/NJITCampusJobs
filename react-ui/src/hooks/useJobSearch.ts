import { JobPost } from "../types";
/**
 * This hook takes a searchValue and a list and return
 * the filtered list based on the search value
 */

export const useJobSearch = (searchValue: string, collection: JobPost[] | undefined) => {
  if (!collection) return [];
  const bySearchJobField = (p: JobPost) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase());

  const postsToShow =
    searchValue && collection ? collection.filter(bySearchJobField) : collection;

  return postsToShow;
};

interface QueryParams {
  page: number;
  limit: number;
  otherParams: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractPaginationQueryParams = (query: any): QueryParams => {
  const page = query.page ? parseInt(query.page as string) : 1;
  const limit = parseInt(query.limit as string) || 10;

  const otherParams = Object.fromEntries(
    Object.entries(query).filter(([key]) => key !== 'page' && key !== 'limit')
  );

  return { page, limit, otherParams };
};
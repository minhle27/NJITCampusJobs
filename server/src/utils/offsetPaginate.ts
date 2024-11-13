import { Model } from "mongoose";

interface PaginationResult<T> {
  currentPage: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
  data: T[];
}

export const offsetPaginate = async <T>(
  model: Model<T>,
  filter: object,
  page: number,
  limit: number,
  sort: string | { [key: string]: 1 | -1 } | [string, 1 | -1][] = {
    createdAt: -1,
  }
): Promise<PaginationResult<T>> => {
  const offset = (page - 1) * limit;

  const data = await model.find(filter).skip(offset).limit(limit).sort(sort);

  const totalRecords = await model.countDocuments(filter);

  return {
    currentPage: page,
    perPage: limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    data,
  };
};

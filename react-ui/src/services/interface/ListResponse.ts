interface ListResponse<T> {
  currentPage: number
  perPage: number
  totalRecords: number
  totalPages: number
  data: T[]
}

export default ListResponse;
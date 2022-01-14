import { PaginateQuery } from './paginate.decorator';
import { ServiceUnavailableException } from '@nestjs/common';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';

type Column<T> = Extract<keyof T, string>;
type Order<T> = [Column<T>, 'ASC' | 'DESC'];
type SortBy<T> = Order<T>[];

export class Paginated<T> {
  data: [T] | T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    search: string;
    filter?: { [column: string]: string | string[] };
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export interface PaginateConfig<T> {
  sortableColumns: Column<T>[];
  searchableColumns?: Column<T>[];
  maxLimit?: number;
  defaultSortBy?: SortBy<T>;
  defaultLimit?: number;
  where?: FilterQuery<T>;
  filterableColumns?: { [key in Column<T>]?: FilterOperator[] };
}

export enum FilterOperator {
  EQ = '$eq',
  GT = '$gt',
  GTE = '$gte',
  IN = '$in',
  NULL = '$nin',
  LT = '$lt',
  LTE = '$lte',
  NOT = '$not',
}

export async function paginate<T>(
  query: PaginateQuery,
  repo: EntityRepository<T>,
  config: PaginateConfig<T>,
  where?: FilterQuery<T>,
): Promise<Paginated<T>> {
  // Get current page from query
  // And calculate limit of items
  let page = query.page || 1;
  const limit = Math.min(query.limit || config.defaultLimit || 20, config.maxLimit || 100);
  const sortBy = [] as SortBy<T>;
  const path = query.path;

  function isEntityKey(sortableColumns: Column<T>[], column: string): column is Column<T> {
    return !!sortableColumns.find((c) => c === column);
  }

  const { sortableColumns } = config;
  if (config.sortableColumns.length < 1) throw new ServiceUnavailableException();

  query.sortBy?.forEach((order) => {
    if (isEntityKey(sortableColumns, order[0]) && ['ASC', 'DESC'].includes(order[1])) {
      sortBy.push(order as Order<T>);
    }
  });

  if (!sortBy.length) {
    sortBy.push(...(config.defaultSortBy || [[sortableColumns[0], 'ASC']]));
  }

  if (page < 1) page = 1;

  const $or = [];
  if (query.search && config.searchableColumns) {
    config.searchableColumns.forEach((column) => {
      $or.push({
        [column]: {
          $like: `%${query.search}%`,
        },
      });
    });
  }
  const [items, totalItems] = await repo.findAndCount({ $or, ...(where as any) } as FilterQuery<T>, {
    limit,
    offset: (page - 1) * limit,
  });
  let totalPages = totalItems / limit;
  if (totalItems % limit) totalPages = Math.ceil(totalPages);

  const sortByQuery = sortBy.map((order) => `&sortBy=${order.join(':')}`).join('');
  const searchQuery = query.search ? `&search=${query.search}` : '';
  const filterQuery = '';

  const options = `&limit=${limit}${sortByQuery}${searchQuery}${filterQuery}`;
  const buildLink = (p: number): string => path + '?page=' + p + options;

  const results: Paginated<T> = {
    data: items,
    meta: {
      itemsPerPage: limit,
      totalItems,
      currentPage: page,
      totalPages: totalPages,
      sortBy,
      search: query.search,
      filter: query.filter,
    },
    links: {
      first: page == 1 ? undefined : buildLink(1),
      previous: page - 1 < 1 ? undefined : buildLink(page - 1),
      current: buildLink(page),
      next: page + 1 > totalPages ? undefined : buildLink(page + 1),
      last: page == totalPages ? undefined : buildLink(totalPages),
    },
  };
  return Object.assign(new Paginated<T>(), results);
}

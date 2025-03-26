import { useMemo, useState, useCallback } from 'react';

import { sortBy } from 'lodash';

import type { ProductItem } from '@/types';

export type SortKey = 'name' | 'creationDate';

const useProductFilters = (data: ProductItem[]) => {
  const [searchText, setSearchText] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey(key);
  }, []);

  const filteredAndSorted = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    const filtered = data.filter(
      (product) => product.name.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query)
    );

    if (sortKey === 'creationDate') {
      return sortBy(filtered, (item) => new Date(item.creationDate).getTime());
    }

    return sortBy(filtered, sortKey);
  }, [data, searchText, sortKey]);

  return {
    searchText,
    sortKey,
    filteredAndSorted,
    handleSearch,
    handleSort,
  };
};

export { useProductFilters };

import { ChangeEvent } from 'react';

import { Button } from '@/components/common';
import type { SortKey } from '@/hooks/useProductFilters';

import styles from './FiltersBar.module.scss';

type FiltersBarProps = {
  onAdd: () => void;
  searchText: string;
  sortKey: SortKey;
  onSearch: (text: string) => void;
  onSort: (key: SortKey) => void;
};

const FiltersBar = ({ onAdd, searchText, sortKey, onSearch, onSort }: FiltersBarProps) => {
  // searching on type
  // @TODO: add debounce for the search action on type / use useDeferredValue
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortKey;
    onSort(value);
  };

  // @TODO: add button disabled={dataLoading || saveLoading}
  // @TODO: pass select options array as prop && make select common component
  return (
    <div className={styles.container}>
      <Button onClick={onAdd}>Add</Button>

      <input
        type="text"
        placeholder="Search products"
        value={searchText}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <label className={styles.sortLabel}>
        Sort by
        <select value={sortKey} onChange={handleSort} className={styles.sortSelect}>
          <option value="name">Name (asc)</option>
          <option value="creationDate">Creation Date (asc)</option>
        </select>
      </label>
    </div>
  );
};

export { FiltersBar };

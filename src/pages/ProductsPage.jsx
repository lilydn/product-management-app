import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsView } from '@/components/DetailsView';
import { FiltersBar } from '@/components/FiltersBar';
import { ListView } from '@/components/ListView';
import { useProductFilters } from '@/hooks/useProductFilters';
import { fetchProducts } from '@/store/slices/productsSlice';

import styles from './ProductsPage.module.scss';

const ProductsPage = () => {
  const dispatch = useDispatch();

  const { data, dataLoading, dataError } = useSelector((state) => state.products);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const { searchText, sortKey, filteredAndSorted, handleSearch, handleSort } = useProductFilters(data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelectItem = ({ id }) => {
    setSelectedItemId(id);
    setIsAddMode(false);
  };

  const handleAdd = () => {
    setSelectedItemId(null);
    setIsAddMode(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <FiltersBar
          onAdd={handleAdd}
          searchText={searchText}
          sortKey={sortKey}
          onSearch={handleSearch}
          onSort={handleSort}
        />

        <div className={styles.mainPanel}>
          <ListView
            data={filteredAndSorted}
            dataLoading={dataLoading}
            dataError={dataError}
            selectItem={handleSelectItem}
            selectedItemId={selectedItemId}
          />

          <DetailsView
            data={data}
            dataLoading={dataLoading}
            dataError={dataError}
            editId={selectedItemId}
            addMode={isAddMode}
            deselectItem={() => handleSelectItem({ id: null })}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';

import { Button } from '@/components/common';
import { deleteProduct } from '@/store/slices/productsSlice';

import styles from './ListView.module.scss';

const ListView = ({ data, dataLoading, dataError, selectItem, selectedItemId }) => {
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { deleteLoading, deleteError } = useSelector((state) => state.products);

  const handleDelete = ({ e, deleteClickedId }) => {
    e.stopPropagation();
    setDeleteItemId(deleteClickedId);
    dispatch(deleteProduct({ id: deleteClickedId }));
  };

  if (dataLoading && !dataError) {
    return <div className={styles.centeredContent}>Loading...</div>;
  }

  if (dataError) {
    return <div className={styles.centeredContent}>{dataError}</div>;
  }

  if (!dataLoading && !dataError && data?.length === 0) {
    return <div className={styles.centeredContent}>No items to display</div>;
  }

  return (
    <div className={styles.container}>
      {data.map((item) => {
        const isSelected = selectedItemId === item.id;
        const isDeleting = deleteItemId === item.id;
        return (
          <div
            key={item.id}
            className={clsx(styles.card, {
              [styles.selected]: isSelected,
            })}
            onClick={() => selectItem({ id: item.id })}
          >
            {/* @TODO extract image rendering to reusable component */}
            <>
              {item.image ? (
                <img className={styles.imagePlaceholder} src={`/assets/images/${item.image}`} alt={item.name} />
              ) : (
                <div className={styles.imagePlaceholder}>📷</div>
              )}
            </>

            <div className={styles.content}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.description}>{item.description}</div>
            </div>

            <div className={styles.actions}>
              <Button
                onClick={(e) => handleDelete({ e, deleteClickedId: item.id })}
                disabled={isDeleting && deleteLoading}
                className={styles.deleteButton}
              >
                {isDeleting && deleteLoading ? 'Deleting...' : 'Delete'}
              </Button>

              {isDeleting && deleteError && <p className={styles.error}>error deleting item</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { ListView };

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/common';
import { updateProduct, createProduct } from '@/store/slices/productsSlice';
import { isProductFormValid } from '@/utils/formValidation';

import styles from './DetailsView.module.scss';

// @TODO initial values as const
const emptyItem = {
  name: '',
  description: '',
  price: 0.0,
};

const DetailsView = ({ data, dataLoading, dataError, editId, addMode, deselectItem }) => {
  const dispatch = useDispatch();
  const { saveLoading, saveError } = useSelector((state) => state.products);

  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const item = useMemo(() => {
    if (addMode) return emptyItem;
    if (editId === null || editId === undefined) return null;
    return data.find((item) => item.id === editId);
  }, [data, editId, addMode]);

  const isValid = useMemo(() => isProductFormValid(form), [form]);

  useEffect(() => {
    if (!item) return;
    setForm({
      name: item.name || '',
      description: item.description || '',
      price: item.price?.toString() || '',
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/[^\d.]/g, '') : value,
    }));
  };

  const handleSave = async () => {
    if (!isValid) return;

    const updatedItem = {
      ...item,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
    };

    const action = addMode ? createProduct : updateProduct;

    // on successful save - deselect item and unmount form inputs
    try {
      const resultAction = await dispatch(action({ item: updatedItem })).unwrap();
      deselectItem();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  if (!item) {
    return <div className={styles.centeredContent}>Please select a product to see details</div>;
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>{item.name ? `${item.name} Details` : 'Add New Item'}</p>

      {/* @TODO extract image rendering to reusable component */}
      <div className={styles.imageContainer}>
        {item.image ? (
          <img className={styles.image} src={`/assets/images/${item.image}`} alt={item.name} />
        ) : (
          <div className={styles.imagePlaceholder}>📷</div>
        )}
      </div>

      <label className={styles.label}>
        Name
        <input type="text" name="name" value={form.name} onChange={handleChange} maxLength={30} />
      </label>

      <label className={styles.label}>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} maxLength={200} />
      </label>

      <label className={styles.label}>
        Price
        <div className={styles.priceInputWrapper}>
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" />
          <span>$</span>
        </div>
      </label>

      <Button onClick={handleSave} disabled={!isValid || saveLoading} className={styles.saveButton}>
        {saveLoading ? 'Saving...' : 'Save'}
      </Button>

      {saveError && <p className={styles.error}>{saveError}</p>}
    </div>
  );
};

export { DetailsView };

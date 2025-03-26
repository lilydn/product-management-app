import type { ProductItem } from '@/types';

const STORAGE_KEY = 'productsList';

const loadProductsFromStorage = (): ProductItem[] | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed.map((item: any) => ({
      ...item,
      creationDate: new Date(item.creationDate),
    })) as ProductItem[];
  } catch {
    return [];
  }
};

const saveProductsToStorage = (data: ProductItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export { loadProductsFromStorage, saveProductsToStorage };

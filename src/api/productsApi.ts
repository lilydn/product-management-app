import { v4 as uuidv4 } from 'uuid';

import { simulateNetworkRequest } from '@/api/utils';
import type { ProductItem, NewItemReqBody, SimulateOptions } from '@/types';
import { loadProductsFromStorage, saveProductsToStorage } from '@/utils/localStorage';

const withNetworkSimulation = async (fn: () => Promise<any>, options?: SimulateOptions) => {
  await simulateNetworkRequest(options ?? {});
  return fn();
};

export const getProductsApi = async (options?: SimulateOptions) =>
  withNetworkSimulation(async () => {
    const savedFromLocalStorageData = loadProductsFromStorage();
    if (savedFromLocalStorageData && savedFromLocalStorageData.length > 0) {
      return savedFromLocalStorageData;
    }

    const response = await fetch('/src/data/initialProducts.json');
    if (!response.ok) throw new Error('simulated error');

    const data: ProductItem[] = await response.json();

    saveProductsToStorage(data);

    return data;
  }, options);

export const deleteProductApi = async (id: string, options?: SimulateOptions) =>
  withNetworkSimulation(async () => {
    return { success: true, id };
  }, options);

export const updateProductApi = async (item: ProductItem, options?: SimulateOptions) =>
  withNetworkSimulation(async () => {
    return { success: true, item };
  }, options);

export const addProductApi = async (newItemRequestData: NewItemReqBody, options?: SimulateOptions) =>
  withNetworkSimulation(async () => {
    const { name, description, price } = newItemRequestData;

    const newItem: ProductItem = {
      id: uuidv4(),
      name,
      description: description || '',
      price,
      creationDate: new Date(),
    };

    return { success: true, item: newItem };
  }, options);

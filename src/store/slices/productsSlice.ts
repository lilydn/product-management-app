import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getProductsApi, deleteProductApi, updateProductApi, addProductApi } from '@/api/productsApi';
import { getSimulateOptions } from '@/store/utils';
import type { ProductItem } from '@/types';
import { saveProductsToStorage } from '@/utils/localStorage';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const data = await getProductsApi(getSimulateOptions('FETCH_PRODUCTS'));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not fetch products: ${error.message}`);
    } else {
      throw new Error('Could not fetch products: an unexpected error occurred');
    }
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async ({ id }: { id: string }) => {
  try {
    const response = await deleteProductApi(id, getSimulateOptions('DELETE_PRODUCT'));
    return response.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not delete product: ${error.message} (product id: ${id})`);
    } else {
      throw new Error(`Could not delete product: an unexpected error occurred (product id: ${id})`);
    }
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ item }: { item: ProductItem }) => {
  try {
    const response = await updateProductApi(item, getSimulateOptions('UPDATE_PRODUCT'));
    return response.item;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not update product: ${error.message} (product id: ${item.id})`);
    } else {
      throw new Error(`Could not update product: an unexpected error occurred (product id: ${item.id})`);
    }
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async ({ item }: { item: ProductItem }) => {
  try {
    const response = await addProductApi(item, getSimulateOptions('ADD_PRODUCT'));
    return response.item;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not create product: ${error.message}`);
    } else {
      throw new Error('Could not create product: an unexpected error occurred');
    }
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [] as ProductItem[],
    // fetch async states:
    dataLoading: false,
    dataError: null as string | null,

    // delete async states:
    deleteLoading: false,
    deleteError: null as string | null,

    // update & create - save item async states:
    saveLoading: false,
    saveError: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // on fetch reducers:
      .addCase(fetchProducts.pending, (state) => {
        state.dataLoading = true;
        state.dataError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.dataLoading = false;
        state.dataError = action.error.message || 'Data fetching failed, please try again';
      })

      // on delete reducers:
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.data = state.data.filter((product) => product.id !== action.payload);
        saveProductsToStorage(state.data);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.error.message || 'Delete failed, please try again';
      })

      // on update reducers:
      .addCase(updateProduct.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.saveLoading = false;
        const index = state.data.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
          saveProductsToStorage(state.data);
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.saveLoading = false;
        state.saveError = action.error.message || 'Update failed, please try again';
      })

      // on creation reducers:
      .addCase(createProduct.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.data = [action.payload, ...state.data];
        saveProductsToStorage(state.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.saveLoading = false;
        state.saveError = action.error.message || 'Creation failed, please try again';
      });
  },
});

export default productsSlice.reducer;

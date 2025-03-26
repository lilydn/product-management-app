import type { SimulateOptions } from '@/types';

const SIMULATION_CONFIG = {
  FETCH_PRODUCTS: { delayMs: 1000, error: false },
  DELETE_PRODUCT: { delayMs: 1800, error: false },
  UPDATE_PRODUCT: { delayMs: 1400, error: false },
  ADD_PRODUCT: { delayMs: 2000, error: false },
} as const;

const getSimulateOptions = (operation: keyof typeof SIMULATION_CONFIG): SimulateOptions => {
  return SIMULATION_CONFIG[operation];
};

export { getSimulateOptions };

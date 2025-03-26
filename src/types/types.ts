type ProductItem = {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
};

type NewItemReqBody = Omit<ProductItem, 'id' | 'creationDate'>;

type ProductForm = Omit<ProductItem, 'id' | 'creationDate'> & {
  price: number | string;
};

type SimulateOptions = {
  error?: boolean;
  delayMs?: number;
};

export type { ProductItem, NewItemReqBody, ProductForm, SimulateOptions };

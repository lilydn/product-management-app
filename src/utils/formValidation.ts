import type { ProductForm } from '@/types';

const isProductFormValid = (form: ProductForm): boolean => {
  const nameValid = form.name.trim().length > 0;
  const priceNumber = Number(form.price);
  const priceValid = !isNaN(priceNumber) && priceNumber > 0;

  return nameValid && priceValid;
};

export { isProductFormValid };

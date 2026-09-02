import type { Product } from "../data/products";
import { api } from "./apiConfig";

export const getProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const { data } = await api.post<Product>("/products", product);
  return data;
};

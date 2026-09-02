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

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete<Product>(`/products/${id}`);
  return data;
};

export const editProduct = async (id: string, product: Omit<Product, "id">) => {
  console.log(id, "id", product, "pdor");
  const { data } = await api.patch(`/products/${id}`, product);
  return data;
};

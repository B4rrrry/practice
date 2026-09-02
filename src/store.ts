import { create } from "zustand";
import type { ProductCardProps } from "./components/ProductCard/ProductCard";
import { devtools, persist } from "zustand/middleware";

interface InitialStateProps {
  favorites: ProductCardProps[] | [];
  setFavorite: (product: ProductCardProps) => void;
  removeFavorite: (product: ProductCardProps) => void;
}

export const useFavorites = create<InitialStateProps>()(persist(devtools((set) => ({
  favorites: [],
  setFavorite: (product) => set((state) => ({favorites:[...state.favorites, product]}) ),
  removeFavorite: (product) => set((state) => ({favorites: state.favorites.filter(productState => productState.id != product.id)}))
}))));

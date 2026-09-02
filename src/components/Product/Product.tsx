import type { FC } from "react";
import cls from "./Product.module.scss";
import { useFavorites } from "./../../store";
import type { Product as ProductData } from "../../data/products";

export interface ProductProps {
  product: ProductData;
}

const Product: FC<ProductProps> = (props) => {
  const { product } = props;
  const favorites = useFavorites((state) => state.favorites);
  const createFavorite = useFavorites((state) => state.setFavorite);
  const removeFavorite = useFavorites((state) => state.removeFavorite);
  const isFavorite = favorites.some((favorite) => favorite.id == product.id);
  console.log("render");
  return (
    <div
      className={`${cls.Product} bg-gray-300 p-2.5 rounded-[10px] mr-2.5 mb-2.5 last:mb-0 last:mr-0`}
    >
      <div className="header">
        <p className="name">{product.title}</p>
        <p className="category">{product.category}</p>
      </div>
      <div className="img size-37.5 bg-gray-400 rounded-sm"></div>
      <p>{product.price}</p>
      {!isFavorite ? (
        <button
          onClick={() => createFavorite(product)}
          className="bg-gray-400 p-2 rounded-sm text-white"
        >
          Add to favorites
        </button>
      ) : (
        <button
          onClick={() => removeFavorite(product)}
          className="bg-gray-400 p-2 rounded-sm text-white"
        >
          Remove from favorites
        </button>
      )}
    </div>
  );
};
export default Product;

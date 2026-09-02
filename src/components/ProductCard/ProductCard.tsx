import type { FC } from "react";
import cls from "./ProductCard.module.scss";
import { useFavorites } from "./../../store";
import { Link } from "react-router";

export interface ProductCardProps {
  title: string;
  price: number;
  category: string;
  id: string;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { title, price, category, id } = props;
  const favorites = useFavorites((state) => state.favorites);
  const createFavorite = useFavorites((state) => state.setFavorite);
  const removeFavorite = useFavorites((state) => state.removeFavorite);
  const product = {title,price,category,id};
  const isFavorite =
    favorites.filter((favorite) => favorite.id == id).length >= 1 ? 1 : 0;
  console.log('render')
  return (
    <div
      className={`${cls.Product} bg-gray-300 p-[10px] rounded-[10px] mr-[10px] mb-[10px] [&:nth-last-child(1)]:mb-0 [&:nth-last-child(1)]:mr-0`}
    >
      <div className="header">
       
        <Link to={`/products/${id}`}><p className="name">{title}</p></Link> 
        <p className="category">{category}</p>
      </div>
      <div className="img size-[150px] bg-gray-400 rounded-sm"></div>
      <p>{price}</p>
      {!isFavorite ? (
        <button onClick={() => createFavorite(product)}className="bg-gray-400 p-2 rounded-sm text-white">
          Add to favorites
        </button>
      ) : (
        <button onClick={() => removeFavorite(product)} className="bg-gray-400 p-2 rounded-sm text-white">
          Remove from favorites
        </button>
      )}
    </div>
  );
};
export default ProductCard;

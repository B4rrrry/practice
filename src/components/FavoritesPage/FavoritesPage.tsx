import { useFavorites } from "../../store";
import ProductCard from "../ProductCard/ProductCard";


const FavoritesPage = () => {
  const favorites = useFavorites((state) => state.favorites);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-[30px]">Favorites page</h1>
      <div className="flex">
        {favorites.map((item) => (
          <ProductCard
            category={item.category}
            id={item.id}
            price={item.price}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

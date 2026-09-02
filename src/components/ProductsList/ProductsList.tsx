import { type FC } from "react";
import cls from "./ProductsList.module.scss";
import ProductCard from "../ProductCard/ProductCard";

import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { getProducts } from "../../api/products";

export interface ProductsListProps {
  filter?: "electronics" | "clothes" | "food" | "all";
}

const ProductsList: FC<ProductsListProps> = (props) => {
  const { filter } = props;

  const {
    data: data = [],
    isSuccess,
    isLoading,
    isFetching,
    isError,
    status,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const productsFiltered =
    filter != "all" ? data.filter((item) => item.category == filter) : data;
  console.log(status, "status", isLoading, isFetching);
  return (
    <div className="container ">
      <div className={`${cls.ProductsList} flex flex-wrap`}>
        {(isLoading || isFetching) && <Loader />}
        {isError && (
          <p className="text-xl text-red-700 font-bold">Ошибка в запросе</p>
        )}
        {isSuccess &&
          !isFetching &&
          productsFiltered.map((item) => (
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
export default ProductsList;

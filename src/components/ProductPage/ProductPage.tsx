import { useParams } from "react-router";
import cls from "./ProductPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { getProductById } from "../../api/products";

const ProductPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: Boolean(id),
  });

  return (
    <div className={cls.ProductPage}>
      {isLoading && <Loader />}

      {!isLoading && (
        <div>
          <h1 className="font-bold text-3xl mb-10">Product {id}</h1>
          <div className="img size-40 bg-amber-400 mb-5"></div>
          <p className="text-xl mb-3">{data?.title}</p>
          <p className="text-xl mb-3">{data?.category}</p>
          <p className="text-xl">{data?.price}</p>
        </div>
      )}
    </div>
  );
};
export default ProductPage;

import type { SubmitEvent } from "react";
import cls from "./AddProductPage.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../data/products";
import Loader from "../Loader/Loader";
import { createProduct } from "../../api/products";

type ProductCategory = Product["category"];

const isProductCategory = (value: string): value is ProductCategory => {
  return ["electronics", "clothes", "food"].includes(value);
};

const AddProductPage = () => {
  const queryClient = useQueryClient();

  const createProductHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const category = String(formData.get("category"));
    if (!isProductCategory(category)) {
      return;
    }
    const product: Omit<Product, "id"> = {
      title: String(formData.get("title")),
      category,
      price: Number(formData.get("price")),
    };
    mutationProductCreate.mutate(product);
  };

  const mutationProductCreate = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      setTimeout(() => mutationProductCreate.reset(), 5000);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  console.log(mutationProductCreate.isSuccess, "qwq");
  return (
    <div className={cls.AddProductPage}>
      <h1 className="font-bold text-3xl mb-10">AddProductPage</h1>
      {mutationProductCreate.isSuccess && <p>Product Created!</p>}
      {mutationProductCreate.isError && (
        <p className="text-xl text-red-700 font-bold">Ошибка в запросе</p>
      )}
      {mutationProductCreate.isPending && <Loader />}
      {!mutationProductCreate.isPending && (
        <form onSubmit={createProductHandler}>
          <div className="row mb-2">
            <p className="text-xl mb-3">Title</p>
            <input
              type="text"
              className="border-1 p-2 rounded-sm"
              name="title"
              id="title"
              placeholder="Title"
            />
          </div>
          <div className="row mb-2">
            <p className="text-xl mb-3">Category</p>
            <select
              name="category"
              defaultValue=""
              required
              className="border-1 p-2 rounded-sm"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div className="row mb-2">
            <p className="text-xl mb-3">Price</p>
            <input
              type="text"
              className="border-1 p-2 rounded-sm"
              name="price"
              id="price"
              placeholder="Price"
            />
          </div>
          <button className="w-50 border-2 p-2 rounded-sm bg-gray-400 text-white">
            Create
          </button>
        </form>
      )}
    </div>
  );
};
export default AddProductPage;

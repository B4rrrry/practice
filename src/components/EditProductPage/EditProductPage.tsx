import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import cls from "./EditProductPage.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../data/products";
import Loader from "../Loader/Loader";
import { createProduct, editProduct, getProducts } from "../../api/products";

type ProductCategory = Product["category"];

const isProductCategory = (value: string): value is ProductCategory => {
  return ["electronics", "clothes", "food"].includes(value);
};

const categories = ["electronics", "clothes", "food"];

const EditProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (
      !selectedProduct ||
      !titleRef.current ||
      !categoryRef.current ||
      !priceRef.current
    ) {
      return;
    }

    const product = data.find((item) => item.id === selectedProduct);
    console.log(product);

    if (product) {
      titleRef.current.value = product.title;
      categoryRef.current.value = product.category;
      priceRef.current.value = product.price.toString();
    }
  }, [selectedProduct, data]);

  const editProductHandler = async (e: SubmitEvent<HTMLFormElement>) => {
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
    selectedProduct &&
      mutationProductEdit.mutate({ id: selectedProduct, product });
  };

  const mutationProductEdit = useMutation({
    mutationFn: (data: { id: string; product: Omit<Product, "id"> }) =>
      editProduct(data.id, data.product),

    onSuccess: () => {
      setTimeout(() => mutationProductEdit.reset(), 3000);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <div className={cls.EditProductPage}>
      <h1 className="font-bold text-3xl mb-10">EditProductPage</h1>
      {mutationProductEdit.isSuccess && <p>Product Edited!</p>}
      {mutationProductEdit.isError && (
        <p className="text-xl text-red-700 font-bold">Ошибка в запросе</p>
      )}
      {(isLoading || mutationProductEdit.isPending) && <Loader />}
      {!isLoading && !mutationProductEdit.isPending && (
        <select
          name="products"
          defaultValue=""
          required
          className="border-1 p-2 rounded-sm mb-5"
          onChange={(
            event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
          ) => {
            setSelectedProduct(event.target.value);
          }}
        >
          <option value="" disabled>
            Select product
          </option>
          {data.map((item) => (
            <option value={item.id} key={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      )}
      {selectedProduct && mutationProductEdit.isIdle && (
        <form onSubmit={editProductHandler}>
          <div className="row mb-2">
            <p className="text-xl mb-3">Title</p>
            <input
              type="text"
              className="border-1 p-2 rounded-sm"
              name="title"
              id="title"
              placeholder="Title"
              ref={titleRef}
            />
          </div>
          <div className="row mb-2">
            <p className="text-xl mb-3">Category</p>
            <select
              name="category"
              defaultValue=""
              required
              className="border-1 p-2 rounded-sm"
              ref={categoryRef}
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
              ref={priceRef}
            />
          </div>
          <button className="w-50 border-2 p-2 rounded-sm bg-gray-400 text-white">
            Edit
          </button>
        </form>
      )}
    </div>
  );
};
export default EditProductPage;

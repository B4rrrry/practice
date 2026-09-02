import { useState } from "react";
import Button from "../Button/Button";
import ProductsList, {
  type ProductsListProps,
} from "../ProductsList/ProductsList";
type ProductFilter = NonNullable<ProductsListProps["filter"]>;

const ProductsPage = () => {
  const [filter, setFilter] = useState<ProductFilter>("all");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-[30px]">Products Page</h1>
      <div className="flex filters mb-6 items-center">
        <p className="text-xl p-0 mr-[10px]">Filters</p>
        <Button onClick={() => setFilter("all")} className="mr-[10px]">
          All
        </Button>
        <Button onClick={() => setFilter("electronics")} className="mr-[10px]">
          Electronics
        </Button>
        <Button onClick={() => setFilter("clothes")} className="mr-[10px]">
          Clothes
        </Button>
        <Button onClick={() => setFilter("food")} className="mr-[10px]">
          Food
        </Button>
      </div>
      <div className="w-[90%]">
        <ProductsList filter={filter} />
      </div>
    </div>
  );
};

export default ProductsPage;

import AddProductPage from "../AddProductPage/AddProductPage";
import EditProductPage from "../EditProductPage/EditProductPage";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import MainLayout from "../layout/MainLayout";
import MainPage from "../MainPage/MainPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProductPage from "../ProductPage/ProductPage";
import ProductsPage from "../ProductsPage/ProductsPage";

import { Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/create" element={<AddProductPage />} />
        <Route path="products/edit" element={<EditProductPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

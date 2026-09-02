export type Product = {
  id: string;
  title: string;
  price: number;
  category: "electronics" | "clothes" | "food";
};

export const products: Product[] = [
  {
    id: '1',
    title: "Mechanical Keyboard",
    price: 120,
    category: "electronics",
  },
  {
    id: '2',
    title: "Gaming Mouse",
    price: 70,
    category: "electronics",
  },
  {
    id: '3',
    title: "Monitor 27",
    price: 320,
    category: "electronics",
  },
  {
    id: '4',
    title: "T-Shirt",
    price: 25,
    category: "clothes",
  },
  {
    id: '5',
    title: "Hoodie",
    price: 60,
    category: "clothes",
  },
  {
    id: '6',
    title: "Jeans",
    price: 80,
    category: "clothes",
  },
  {
    id: '7',
    title: "Coffee",
    price: 15,
    category: "food",
  },
  {
    id: '8',
    title: "Chocolate",
    price: 8,
    category: "food",
  },
  {
    id: '9',
    title: "Pizza",
    price: 20,
    category: "food",
  },
];

import { Product } from "./product.interface";

interface ProductCategory {
    category: string;
    products: Product[];
  }

  export { Product, ProductCategory};
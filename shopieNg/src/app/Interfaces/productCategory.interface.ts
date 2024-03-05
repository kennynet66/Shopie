import { Product } from "./product.interface";
import { product } from "./products.Interface";

interface ProductCategory {
    category: string;
    products: product[];
  }

  export { Product, ProductCategory};
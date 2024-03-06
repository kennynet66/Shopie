import { Product } from "./product.interface";

interface ApiResponse {
    products: Product[];
    error: string;
  }

  export { ApiResponse};
  
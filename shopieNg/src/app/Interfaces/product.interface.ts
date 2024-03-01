// export interface product{
//     productId: string,
//     productName: string,
//     categoryId: string,
//     price: number,
//     quantity: number,
//     descr: string
// }

// product.interface.ts

interface Rating {
    rate: number;
    count: number;
  }
  
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export { Product, Rating };
  
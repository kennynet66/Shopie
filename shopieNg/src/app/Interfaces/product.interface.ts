
interface Rating {
    rate: number;
    count: number;
  }
  
interface Product {
    categoryId: string;
    categoryName: string;
    productId: string;
    productName: string;
    descr: string;
    productQuantity: number;
    productPrice: number;
    productImage: string;
    productCategory: string;
  }
  
  export { Product, Rating };
  
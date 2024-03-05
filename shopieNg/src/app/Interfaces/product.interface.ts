
interface Rating {
    rate: number;
    count: number;
  }
  
  interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export { Product, Rating };
  
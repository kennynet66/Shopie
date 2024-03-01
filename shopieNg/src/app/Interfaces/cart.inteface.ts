interface cart {
    id: number;
    userId: number;
    date: string; 
    products: cartProduct[];
    __v: number;
  }
  
  interface cartProduct {
    productId: number;
    quantity: number;
  }
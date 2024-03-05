export interface Product {
    productId: number;
    quantity: number;
}

export interface cart {
    id: string,
    userId: string,
    date: string,
    products: Product[]
}
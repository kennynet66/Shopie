export interface Products {
  products: [
    {
      productId: string,
      productName: string,
      categoryName: string,
      descr: string,
      productQuantity: number,
      productPrice: number,
      productImage: string,
      productCategory: string
    }
  ]
  error: string
}

export interface product {
  productId: string,
  productName: string,
  categoryName: string,
  descr: string,
  productQuantity: number,
  productPrice: number,
  productImage: string,
  productCategory: string
}

export interface newProductResponse {
  success: string,
  error: string,
}

export interface deleteProductResponse {
  success: string,
  error: string,
}

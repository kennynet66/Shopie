export interface productsResponse {
  products: [
    {
      categoryId : string,
      productId: string,
      productName: string,
      categoryName: string,
      descr: string,
      productQuantity: number,
      productPrice: number,
      productImage: string,
    }
  ]
  error: string
}

export interface product {
  categoryId : string,
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

export interface updateProductInterface{
  success: string,
  error: string
}

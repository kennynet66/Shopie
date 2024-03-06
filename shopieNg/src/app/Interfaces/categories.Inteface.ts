export interface Categories{
  categories: [
    {
      categoryId: string
      categoryName: string
      categoryImage: string
    }
  ]
  error: string
}

export interface category {
  categoryId: string
  categoryName: string
  categoryImage: string
}

export interface createCategoryResponse{
  success: string
  error: string
}

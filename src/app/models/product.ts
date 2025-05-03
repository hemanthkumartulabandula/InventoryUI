export interface Product {

    productId: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    categoryId: number;
    supplierId: number;
  
    // Optional (used in ProductReadDto response)
    categoryName?: string;
    supplierName?: string;
    
  }
  
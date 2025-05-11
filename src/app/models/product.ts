export interface Product {

    productId: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    categoryId: number;
    supplierId: number;
  
  
    categoryName?: string;
    supplierName?: string;
    
  }
  
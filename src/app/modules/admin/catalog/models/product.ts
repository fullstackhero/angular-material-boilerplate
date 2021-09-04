import { Upload } from "src/app/core/models/uploads/upload";

export interface Product {
  id: string;
  name: string;
  localeName: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  cost: number;
  imageUrl: string;
  tax: number;
  taxMethod: string;
  barcodeSymbology: string;
  isAlert?: boolean;
  alertQuantity: number;
  detail: string;
  uploadRequest?: Upload;
}

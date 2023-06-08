import { ICategory } from "../../category/interface/icategory";

export interface IProduct {
  price: number;
  title: string;
  enable: boolean;
  category: ICategory;
}


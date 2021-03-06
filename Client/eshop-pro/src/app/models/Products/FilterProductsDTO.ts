import {Product} from './Product';
import { ProductsOrderBy } from './ProductsOrderBy';

export class FilterProductsDTO {
  constructor(
    public title: string,
    public startPrice: number,
    public endPrice: number,
    public pageId: number,
    public pageCount: number,
    public startPage: number,
    public endPage: number,
    public takeEntity: number,
    public skipEntity: number,
    public activePage: number,
    public categories:number[],
    public products: Product[],
    public orderBy?:ProductsOrderBy,
  ) {
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../models/Common/IResponseResult';
import { AddProductComment } from '../models/Products/AddProductComment';
import { FilterProductsDTO } from '../models/Products/FilterProductsDTO';
import { Product } from '../models/Products/Product';
import { ProductCategory } from '../models/Products/ProductCategory';
import { ProductCommentDTO } from '../models/Products/ProductCommentDTO';
import { ProductDetailDTO } from '../models/Products/ProductDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getFilteredProducts(filter: FilterProductsDTO): Observable<IResponseResult<FilterProductsDTO>> {
    let params;
    if (filter !== null) {
      params = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('title', filter.title)
        .set('startPrice', filter.startPrice.toString())
        .set('endPrice', filter.endPrice.toString())
        .set('takeEntity', filter.takeEntity.toString());

        for(const category of filter.categories)
        {
          params = params.append('categories', category.toString());
        }

        if(filter.orderBy != null){
          params = params.append('orderBy',filter.orderBy.toString())
        }
    }



    return this.http.get<IResponseResult<FilterProductsDTO>>('/api/products/filter-products', {params});
  }

  getProductActiveCategories():Observable<IResponseResult<ProductCategory[]>> {
    return this.http.get<IResponseResult<ProductCategory[]>>('/api/products/active-categories');
  }

  getSingleProduct(productId:number): Observable<IResponseResult<ProductDetailDTO>> {
    return this.http.get<IResponseResult<ProductDetailDTO>>('/api/products/single-product/' + productId);
  }

  getRelatedProducts(produnctId: number):Observable<IResponseResult<Product[]>> {
    return this.http.get<IResponseResult<Product[]>>('/api/products/related-products/' + produnctId);

  }

  getProductComments(productId:number):Observable<IResponseResult<ProductCommentDTO[]>>{
    return this.http.get<IResponseResult<ProductCommentDTO[]>>('/api/products/product-comments/' + productId);
  }

  addProductComment(comment: AddProductComment):Observable<IResponseResult<ProductCommentDTO>>{
    return this.http.post<IResponseResult<ProductCommentDTO>>('/api/products/add-product-comment/',comment);
  }
}

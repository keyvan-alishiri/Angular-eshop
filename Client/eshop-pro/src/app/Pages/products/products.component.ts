import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductsDTO } from 'src/app/models/Products/FilterProductsDTO';
import { ProductCategory } from 'src/app/models/Products/ProductCategory';
import { ProductsOrderBy } from 'src/app/models/Products/ProductsOrderBy';
import { ProductsService } from 'src/app/services/products.service';

declare function jqUiSlider() ;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterProducts: FilterProductsDTO = new FilterProductsDTO(
    '', 0, 0, 1, 0, 0, 0, 6, 0, 1,  [], [],null
  );
  isLoading = true;
  pages: number[] = [];
  categories: ProductCategory[] = [];

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.filterProducts.categories = params.categories ? params.categories : [];
      this.filterProducts.pageId = pageId;
      this.filterProducts.startPrice = params.startPrice ? params.startPrice : 0;
      this.filterProducts.endPrice = params.endPrice ? params.endPrice : 0;
      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if (res.status === 'Success') {
        this.categories = res.data;
      }
    });

    jqUiSlider();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  setMinPrice(event: any) {
    this.filterProducts.startPrice = parseInt(event.value, 0);
  }

  setMaxPrice(event: any) {
    this.filterProducts.endPrice = parseInt(event.value, 0);
  }

  filterButton() {
    this.router.navigate(
      ['products'], {
        queryParams: {
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      }
    );
  }

  changeOrder(event: any) {
    // console.log(event);
    console.log(this.filterProducts);
    this.getProducts();

    switch (event.target.value) {
      case ProductsOrderBy.PriceAsc.toString():
        this.router.navigate(['products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceAsc',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
      case ProductsOrderBy.PriceDes.toString():
        this.router.navigate(['products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceDes',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
    }
  }

  filterCategories(event: any) {
    const value = event.target.value;
    if (this.filterProducts.categories === undefined || this.filterProducts.categories === null) {
      this.filterProducts.categories = [];
    }
    if (event.target.checked) {
      this.filterProducts.categories.push(parseInt(value, 0));
      this.setCategoriesFilter();
    } else {
      this.filterProducts.categories = this.filterProducts.categories.filter(s => s !== parseInt(value, 0));
      this.setCategoriesFilter();
    }
  }

  setCategoriesFilter() {
    if (this.filterProducts.categories.length > 0) {
      this.router.navigate(['products'], {queryParams: {categories: this.filterProducts.categories}});
    } else {
      this.router.navigate(['products']);
    }
  }

  setPage(page: number) {
    this.router.navigate(
      ['products'], {
        queryParams: {
          pageId: page,
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      });
  }

  getProducts() {
    this.productsService.getFilteredProducts(this.filterProducts).subscribe(res => {
      this.filterProducts = res.data;
      if (res.data.title === null) {
        this.filterProducts.title = '';
      }
      this.isLoading = false;
      this.pages = [];
      if (res.data.categories === null) {
        this.filterProducts.categories = [];
      }

      for (let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++) {
        this.pages.push(i);
      }
    });
  }
}

import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { CurrentUserDTO } from 'src/app/models/Account/CurrentUserDTO';
import { AddProductComment } from 'src/app/models/Products/AddProductComment';
import { Product } from 'src/app/models/Products/Product';
import { ProductCommentDTO } from 'src/app/models/Products/ProductCommentDTO';
import { ProductGallery } from 'src/app/models/Products/ProductGallery';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ImageGalleryPath, ImagePath } from 'src/app/Utilities/PathTools';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  imagePath = ImagePath;
  imageGalleryPath = ImageGalleryPath;
  product: Product;
  galleries: ProductGallery[];
  mainImage : string;
  selectedImageId= 0;
  relatedProducts : Product[] = [];
  productComments: ProductCommentDTO[] =[];
  currentUser : CurrentUserDTO = null;
  commentForm: FormGroup;




  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(param => {
      if(param != null){
        this.currentUser = param
      }
    });
    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      if (productId === undefined) {
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if (res.status === 'NotFound') {
          this.router.navigate(['']);
        } else if (res.status === 'Success') {
          this.product = res.data.product;
          this.galleries = res.data.galleries;
          this.mainImage = ImagePath + this.product.imageName;
        }

        this.productService.getRelatedProducts(productId).subscribe( result => {

           if(result.status === 'Success'){
             this.relatedProducts = result.data;
           }
        });
      });

      this.productService.getProductComments(productId).subscribe(result =>
        {
            //  console.log(result);
             this.productComments = result.data;

        });


    });


    this.commentForm= new FormGroup({
   text: new FormControl(null,[
     Validators.required,
     Validators.maxLength(1000)
   ])
    });

  }



  selectImage(imageId: number){

    this.selectedImageId = imageId;
    if(imageId !== 0)
    {
      const gallery = this.galleries.filter(g => g.id === imageId)[0];

      this.mainImage = this.imageGalleryPath + gallery.imageName;


    }
    else{
      this.mainImage = this.imagePath + this.product.imageName;
    }

  }


  addComment(){
    if(this.commentForm.valid){
      const comment = new AddProductComment(this.product.id,this.commentForm.controls.text.value);

      //add comment to a

      this.productService.addProductComment(comment).subscribe( res => {

        if(res.status === 'Success')
        {
          const commentDTO= res.data;
          commentDTO.userFullName = this.currentUser.firstName + ' ' +this.currentUser.lastName ;
          this.productComments.unshift(commentDTO);
          // this.productComments.sort( s => s.id).reverse;
          this.commentForm.reset();
        }

      });
    }

  }
}

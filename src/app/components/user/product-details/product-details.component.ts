import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!:IProduct;
  selectedImage:string |null=null;

 constructor(private productService:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.loadProductById(+id);    
  }
  // loadProduct(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }

 loadProductById(id:number){
  this.productService.getById(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.product=res;
    },
    error:(err)=>{
      console.log(err);
      alert("Failed to load product.")
    }
  })
 }

 getProductImage():string{
  return this.product.images?.[0].imageUrl;
 }

 selectImage(img:string){

  this.selectedImage=img;

 }

}

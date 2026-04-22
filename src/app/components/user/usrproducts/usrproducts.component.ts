import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoryService, ICategory } from '../../../services/category.service';

@Component({
  selector: 'app-usrproducts',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './usrproducts.component.html',
  styleUrl: './usrproducts.component.css'
})
export class UsrproductsComponent implements OnInit {

  productlist:IProduct[]=[];
  categories:ICategory[]=[];
  isCategory='';

  constructor(private productService:ProductService,private categoryService : CategoryService){}
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    
  }

  loadProducts(){
    this.productService.getAll().subscribe({
      next:(res)=>{
        console.log(res);
        this.productlist=res;
      },
      error:(err)=>{
        console.log(err);
        alert("Failed to load product.")
      }
    })
  }

  loadCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categories=res;
      },
      error:(err)=>{
        console.log(err);
        alert("category not fetched")
      }
    })
  }

  loadProductByCat(id:number){
     this.productService.getByCategoryId(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.productlist=res;
      },
      error:(err)=>{
        console.log(err);
        alert("Failed to load product.")
      }
     })
  }

}

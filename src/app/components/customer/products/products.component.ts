import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../../services/product.service';
import { CategoryService, ICategory } from '../../../services/category.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponentimplements implements OnInit {
  productlist:IProduct[]=[];
  categories:ICategory[]=[];


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


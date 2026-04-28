import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ICustomer } from '../../../services/customer.service';
import { CartService, ICartDTO } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: IProduct;
  selectedImage: string | null = null;
  customer!:ICustomer;
  customerId:any;
  cartDTO:ICartDTO={customerId:0,productid:0,quantity:0};

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProductById(+id);

    const store=localStorage.getItem('customer');
    this.customer=store?JSON.parse(store):null;
    this.customerId=this.customer.id;
    console.log(this.customer);
    console.log(id);
    console.log(this.customerId)
  }
  // loadProduct(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }

  loadProductById(id: number) {
    this.productService.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res;
      },
      error: (err) => {
        console.log(err);
        alert("Failed to load product.")
      }
    })
  }

  getProductImage(): string {
    return this.product.images?.[0].imageUrl;
  }

  selectImage(img: string) {

    this.selectedImage = img;

  }

  addToCart(){
    if(!this.customer.id) return;
    if(!this.product.id) return;

    this.cartDTO.customerId=this.customerId;
    this.cartDTO.productid=this.product.id;
    this.cartDTO.quantity=1;

    this.cartService.addToCart(this.cartDTO).subscribe({
      next:(res)=>{
        console.log(res);
        alert("Product added to cart successfully.");
      },
      error:(err)=>{
        console.log(err);
        alert("Failed to add product to cart.");
      }
    })
  }

}

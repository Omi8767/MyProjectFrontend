import { Component, OnInit } from '@angular/core';
import { CartService, ICart, ICartDTO } from '../../../services/cart.service';
import { ICustomer } from '../../../services/customer.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItem: ICart[] = [];
  cartItemDTO:ICartDTO={customerId:0,productid:0,quantity:0}
  total: number = 0;
  isloading = true;
  customer!: ICustomer;

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    const store = localStorage.getItem('customer');
    this.customer = store ? JSON.parse(store) : null;

    if (!this.customer.id) return;

    this.loadCart(this.customer.id);

  }

  loadCart(customerId: number) {

    this.cartService.getCartWithTotal(customerId).subscribe({
      next: ({ items, total }) => {
        this.isloading = false;

        console.log(items);
        this.cartItem = items;

        console.log(total);
        this.total = total;

      },
      error: (err) => {
        console.log(err);
        alert("faild");
      }
    })

  }

  getImages(item: ICart): string {
    const img = item.product?.images?.[0].imageUrl;
    return img;
  }

  updateQuantity(cartItem:ICart,change:number){
    this.cartItemDTO.customerId!=cartItem.customer.id;
    this.cartItemDTO.productid!=cartItem.product.id;
    this.cartItemDTO.quantity=cartItem.quantity+change;
    const newquantity=cartItem.quantity+change;

    cartItem.quantity=newquantity;

    return this.cartService.updateQuantity(cartItem.id!,this.cartItemDTO).subscribe({
      next:(res)=>{
        console.log(res);
        this.loadCart(this.customer.id!);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



}

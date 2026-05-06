import { Component, OnInit } from '@angular/core';
import { CartService, ICart, ICartDTO } from '../../../services/cart.service';
import { ICustomer } from '../../../services/customer.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItem: ICart[] = [];
  cartItemDTO: ICartDTO = { customerId: 0, productid: 0, quantity: 0 }
  total: number = 0;
  isloading = true;
  customer!: ICustomer;

  shipping = {
    name: '',
    address: '',
    city: '',
    pincode: '',
    contact: ''
  }

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }
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

  updateQuantity(cartItem: ICart, change: number) {

    const newquantity = cartItem.quantity + change;

    if (newquantity <= 0) {
      this.removeCart(cartItem);
      return;
    }

    cartItem.quantity = newquantity;

    if (!this.customer.id || !cartItem.product.id || !cartItem.id) return;
    this.cartItemDTO.customerId = this.customer.id;
    this.cartItemDTO.productid = cartItem.product.id;
    this.cartItemDTO.quantity = cartItem.quantity;

    this.cartService.updateQuantity(cartItem.id, this.cartItemDTO).subscribe({
      next: (res) => {
        console.log(res);
        cartItem.quantity = res.quantity;
        this.total = this.cartService.getTotal(this.cartItem)
        // this.loadCart(this.customer.id!);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeCart(cartItem: ICart) {
    if (!cartItem.id) return;
    return this.cartService.removeCart(cartItem.id).subscribe({
      next: () => {
        if (!this.customer.id) return;
        // this.loadCart(this.customer.id);
        this.cartItem = this.cartItem.filter(i => i.id !== cartItem.id);
        this.total = this.cartService.getTotal(this.cartItem);

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  clearCart() {
    if (!this.customer.id) return;

    this.cartService.clearCart(this.customer.id).subscribe({
      next: () => {
        this.cartItem = [];
        this.total = 0;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  placeOrder() {
    const store = localStorage.getItem('customer');
    this.customer = store ? JSON.parse(store) : null;

    if (!this.customer.id) {
      this.router.navigate(['/login']);
    }

    if (!this.shipping.name || !this.shipping.address || !this.shipping.city || !this.shipping.contact || !this.shipping.pincode) {
      alert("please fill the shipping info");
      return;
    }

    this.orderService.placeOrder(
      this.cartItem,
      this.shipping,
      18,
      5
    ).subscribe({
      next: (res) => {
        localStorage.setItem('lastOrder', JSON.stringify(res));
        if (!this.customer.id) return;
        this.cartService.clearCart(this.customer.id).subscribe({
          next: () => {
            this.cartItem = []
            this.loadCart(this.customer.id!);
            this.total = 0;
          }
        });
        this.router.navigate(['/customer/payment']);
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }



}

import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../../services/customer.service';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit {

  customer!: ICustomer;
  orders: any[] = [];

  constructor(private orderService: OrderService, private productService: ProductService) { }
  ngOnInit(): void {
    const store = localStorage.getItem('customer');
    this.customer = store ? JSON.parse(store) : null;

    if (!this.customer.id) return;
    this.loadOrders(this.customer.id);
  }

  loadOrders(customerId: number) {
    this.orderService.getOrderByCustomerId(customerId).subscribe({
      next: (res) => {
        this.orders = res;;
        console.log(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cancelOrder(orderId: number) {
    Swal.fire({
      title: 'Cancel Order?',
      text: 'Are you sure want to cancel order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.orderService.cancleOrder(orderId).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Cancelled!',
            text: 'Your order has been cancelled.',
            timer: 2000,
            showConfirmButton: false
          });
          this.loadOrders(this.customer.id!);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: err.error?.message || 'Error cancelling order'
          });
          console.error(err);
        }
      });
    });
  

  }



}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ICustomer } from '../../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {

  data:any={};
  seller!:ICustomer;

  constructor(private orderService:OrderService){

  }
  ngOnInit(): void {
    const store=localStorage.getItem('seller');
    this.seller=store?JSON.parse(store):null;

    if(!this.seller.id)return;
    this.loadData(this.seller.id);
  }

  loadData(sellerId:number){
    this.orderService.getOrderBySellerId(sellerId).subscribe({
      next:(res)=>{
        setTimeout(()=>{
          this.data=res;
          console.log(res);
        },800)
      },
      error:err=>{
        console.log(err);
      }
    })
  }



}

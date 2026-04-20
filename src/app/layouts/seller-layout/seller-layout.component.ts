import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICustomer } from '../../services/customer.service';

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.css'
})
export class SellerLayoutComponent implements OnInit {

  seller:ICustomer|null=null;
  constructor(private router : Router){}
  ngOnInit(): void {

    const store=localStorage.getItem('seller');
    this.seller=store?JSON.parse(store):null;
    
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

}

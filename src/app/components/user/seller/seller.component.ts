import { Component } from '@angular/core';
import { CustomerService, ICustomer } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {

  seller:ICustomer={
      usertype:'seller',
      name:'',
      email:'',
      contact:0,
      address:'',
      city:'',
      password:''
    }

    
      error='';
    
      constructor(private service:CustomerService){  }
    
      save(){
        this.service.register(this.seller).subscribe({
          next:(res:ICustomer)=>{
            alert("Seller registered successfully!");
          },
          error:(err)=>{
            this.error=err.error||err.message || "Registration Failed";
            console.error("While register",err)
          }
        })
      }

}

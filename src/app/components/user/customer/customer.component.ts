import { Component } from '@angular/core';
import { ICustomer, CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customer:ICustomer={
    usertype:'customer',
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
    this.service.register(this.customer).subscribe({
      next:(res:ICustomer)=>{
        alert("Customer registered successfully!");
      },
      error:(err)=>{
        this.error=err.error||err.message || "Registration Failed";
        console.error("While register",err)
      }
    })
  }
}

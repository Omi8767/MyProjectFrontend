import { Component } from '@angular/core';
import { AdminService, IAdmin } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  admin:IAdmin={
    username:'',
    password:''
  }
  isLoading=false;

  constructor(private service:AdminService,private router:Router){}

  login(){
    this.isLoading=true;
    this.service.login(this.admin).subscribe({
      next:(res:any)=>{
        alert("Login Success..");
        this.router.navigate(['/admin/dashboard'])
      },
      error:(err:any)=>{
        this.isLoading=false;
        console.error(err);
        alert("Failed to Login");
      }
      
    })
  }


}

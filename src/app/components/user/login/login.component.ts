import { Component } from '@angular/core';
import { CustomerService, ILogin } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest: ILogin = {
    email: '',
    password: ''
  }
  error = '';
  showRegisterOption=false;
  showRegisterOptions(){
    this.showRegisterOption=!this.showRegisterOption;
  }

  constructor(private service: CustomerService, private router: Router) { }

  login() {
    this.service.login(this.loginRequest).subscribe({
      next: (res: any) => {
        alert('login successful');
        
        
        if(res.usertype=="customer"){
          localStorage.setItem('customer', JSON.stringify(res));
          this.router.navigate(['/customer/home']);
        }
        else if(res.usertype=="seller"){
          localStorage.setItem('seller',JSON.stringify(res));
          this.router.navigate(['/seller/home']);
        }
        else{
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        alert('login failed: ' + err.message || err.error);
      }
    })
  }

}

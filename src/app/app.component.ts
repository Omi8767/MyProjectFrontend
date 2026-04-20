import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './components/admin/category/category.component';
import { CustomerComponent } from './components/user/customer/customer.component';
import { EnquiryComponent } from './components/user/enquiry/enquiry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

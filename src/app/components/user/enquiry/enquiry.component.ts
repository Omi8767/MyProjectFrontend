import { Component } from '@angular/core';
import { EnquiryService } from '../../../services/enquiry.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {

  enquiries:FormGroup=new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  contact:new FormControl(''),
  subject:new FormControl(''),
  message:new FormControl('')
}); 
  constructor(private enquiryService:EnquiryService){

  }
  save(){
    if(this.enquiries.valid){
    this.enquiryService.submitEnquiry(this.enquiries.value).subscribe({
      next:()=>{
        console.log("Enquiry Submitted...");
        alert("enquiry submitted successfully...");
      },
      error:(err)=>{
        console.log(err);
        alert("failed to submit...");
      }
    })
  }
  }

}

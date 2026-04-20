import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbackForm!:FormGroup;
  issubmitting=false;
  issubmitted=false;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {

  }
  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['',[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')]],

        email: ['',[Validators.required, Validators.email]],
        mobile:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
        productQuality:['',[Validators.required]],
        productPrice:['',[Validators.required]],
        orderProcess:['',[Validators.required]],
        deliveryService:['',[Validators.required]],
        suggestion:['',[Validators.required]]
    })
  }

  setRating(controlname:string,rating:number){
    this.feedbackForm.get(controlname)?.setValue(rating);
  }

  onSubmit(){
    this.issubmitting=true;
    if(this.feedbackForm.invalid)return;
    this.feedbackService.submit(this.feedbackForm.value).subscribe({
      next:()=>{
        this.issubmitting=false;
        this.issubmitted=true;
        this.feedbackForm.reset();
      },
      error:()=>{
        this.issubmitting=false;
      }


    })
  }

}

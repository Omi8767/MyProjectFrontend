import { Component, OnInit } from '@angular/core';
import { ICategory, CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  constructor(private catservice:CategoryService){
    
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  

  category:ICategory ={
    catname:'',
    imgurl:''
  }
  isEdit: boolean = false;
  categories:ICategory[] = [];

  imgPreview: string | null = null;

  success = '';
  error = '';

  // save(){
  //   this.catservice.saveCategory(this.category).subscribe({
  //     next:(res)=>{
  //       this.success

  //     }
  //   })
  // }

  onImageSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.category.imgurl = reader.result as string;
      this.imgPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  save() {
    this.catservice.saveCategory(this.category).subscribe({
      next: () => {
        this.success = "Category saved..!!";
        setTimeout(()=>{
          this.success='';
        },3000);
        this.loadCategories();
      },
      error: (err) => {

        this.error = err.error || err.message || "Failed to save";
        console.error(err);
      }
    })
  }

  loadCategories() {
    this.catservice.getAllCategories().subscribe({
      next: (res) => {
        console.log("Categories from api", res);
        this.categories = res;
      },
      error: (err) => {
        console.error("error while fetching categories", err);
      }
    });
  }

  editCategory(category: ICategory) {
    this.isEdit = true;
    this.category = { ...category };
    this.imgPreview = category.imgurl;
  }

  resetForm() {
    this.isEdit = false;
    this.category = { catname: '', imgurl: '' };
    this.imgPreview = null;
  }

  deleteCategory(id: number) {
    if (!confirm("Are you sure to delete?")) return;
    this.catservice.delete(id).subscribe({
      next: (res: any) => {
        this.success = res.message;
        setTimeout(()=>{
          this.success='';
        },3000);
        this.loadCategories();
      },
      error: (err) => {
        this.error = err.error || err.message || "Failed to delete";
        console.error(err);
      }
    })
  }

  updateCategory() {
    if (!this.category.id) return;

    this.catservice.update(this.category.id, this.category).subscribe({
      next: (res) => {
        this.success = "Category updated..!!";
        setTimeout(()=>{
          this.success='';
        },3000);
        this.loadCategories();
        this.resetForm();
      },
      error: (err) => {
        this.error = err.error || err.message || "Failed to update";
        console.error(err);
      }
    })
  }


}  


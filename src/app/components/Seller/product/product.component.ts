import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../../../services/product.service';
import { CategoryService, ICategory } from '../../../services/category.service';
import { CustomerService, ICustomer } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: IProduct[] = [];
  categories: ICategory[] = [];
  seller!: ICustomer;

  isEdit = false;

  newProduct: any = this.getEmptyProduct();
  // imagePreview: string | null = null;
  imagePreview: string[] = [];
  
  constructor(private categoryService: CategoryService, private productService: ProductService, private customerService: CustomerService) { }

  getEmptyProduct() {
    return {
      name: '',
      price: 0,
      unit:'',
      stock: 0,
      available: true,
      categoryId: 0,
      imageurls: [],
      specifications: []
    }
  }

  ngOnInit(): void {
    this.loadCategories();

    const userData = localStorage.getItem('seller');
    this.seller = userData ? JSON.parse((userData)) : null;

        this.loadProducts();    

  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log("Categories from api", res);
        this.categories = res;
      },
      error: (err) => {
        console.log("Error while loading categories", err);
      }
    })
  }

  loadProducts() {
    if(this.seller){
      this.productService.getBySellerId(this.seller.id!).subscribe({
      next: (res) => {
        console.log("products from api", res);
        this.products = res;
      },
      error: (err) => {
        console.log("Error while loading products", err);
      }
    })
    }
    else{
      this.products=[];
    }
    
  }


  onImageSelected(event: any) {
    const files = event.target.files;

    this.newProduct.imageurls = [];
    // this.imagePreview = null;
    this.imagePreview = [];

    if (!files.length) return

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
              const result = reader.result as string;

        // this.newProduct.imageurls.push(reader.result as string);
        this.newProduct.imageurls.push(result);//newlyadded
        this.imagePreview.push(result);//newlyaddes

        // if (!this.imagePreview) {
        //   this.imagePreview = reader.result as string
        // }
      };
      reader.readAsDataURL(file);
    });
  }
  

  addSpecification() {
    this.newProduct.specifications.push({ name: '', value: '' });
  }

  removeSpecification(index: number) {
    this.newProduct.specifications.splice(index, 1);
  }

  addProduct() {
    this.newProduct.sellerId = this.seller.id;
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert('Product Saved');
        this.resetForm();
        this.loadProducts();
      },
      error: err => alert('Error ' + (err.error || err.message || JSON.stringify(err)))
    })
  }

  editProduct(p: IProduct) {
    this.isEdit = true;
    console.log("Edit Product", p);

    this.newProduct = {
      name: p.name,
      price: p.price,
      unit:p.unit,
      stock: p.stock,
      available: p.available,
      categoryId: p.category?.id || 0,
      // imageurls: p.images?.[0]?.imageUrl || '',
      imageurls: p.images ? p.images.map(img => img.imageUrl) : [],
      // specifications: p.specifications || [],
      specifications: p.specifications ? [...p.specifications] : [],

      id: p.id
    }
   // this.imagePreview = p.images?.[0].imageUrl||'';
  this.imagePreview = p.images ? p.images.map(img => img.imageUrl) : [];
  }

  updateProduct() {
    if (!this.newProduct.id) return;

    this.newProduct.sellerId = this.seller.id;
    this.productService.update(this.newProduct.id, this.newProduct).subscribe({
      next: () => {
        alert('Product Update');
        this.resetForm();
        this.loadProducts();
      },
      error: err => {
        alert('Error ' + (err.error || err.message || JSON.stringify(err)));
        console.error(err);
      }
    })
  }

  deleteProduct(id: number) {
    if(!id){
      alert('Invalid Product ID');
      return;
    }
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(id).subscribe({
      next: () => {
        alert('Product Deleted..');
        this.resetForm();
        this.loadProducts();
      },
      // error: err => alert('Error ' + (err.error || err.message || JSON.stringify(err)))
      error: err => {
        console.error(err);
      alert('Delete failed: Product not found or server error');
      }
    })
  }

  resetForm() {
    this.isEdit = false;
    this.newProduct = this.getEmptyProduct();
    //  this.imagePreview = null;
    this.imagePreview = [];
  }



}

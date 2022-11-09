import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ApiService) { }

  productForm !: FormGroup

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productShortCode: ['', Validators.required],
      category:['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      isBestAchived: [false],
      createdDate: ['', Validators.required],
      origin: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  createProduct() {
    if (this.productForm.valid) {
      this.api.createNewProduct(this.productForm.value)
        .subscribe({
          next: (res: any)=>{
            console.log(res);
          },
          error: () => {
            console.log("Error occured");
          }
        })
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UpdateProductService } from '../services/update-product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, 
    private api: ApiService, 
    private router: Router, 
    private updateProduct: UpdateProductService
  ) { }

  productForm !: FormGroup
  updateData: any = this.updateProduct.getData()
  createOrUpdate: string = 'Create';

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

    if (this.updateData._id) {
      this.createOrUpdate = 'Update';
      this.productForm.controls['productName'].setValue(this.updateData.productName)
      this.productForm.controls['productShortCode'].setValue(this.updateData.productShortCode)
      this.productForm.controls['category'].setValue(this.updateData.category)
      this.productForm.controls['price'].setValue(this.updateData.price)
      this.productForm.controls['description'].setValue(this.updateData.description)
      this.productForm.controls['imageUrl'].setValue(this.updateData.imageUrl)
      this.productForm.controls['isBestAchived'].setValue(this.updateData.isBestAchived)
      this.productForm.controls['createdDate'].setValue(this.updateData.createdDate)
      this.productForm.controls['origin'].setValue(this.updateData.origin)
      this.productForm.controls['quantity'].setValue(this.updateData.quantity)
    } else {
      this.createOrUpdate = 'Create';
    }
  }

  ngOnDestroy(): void {
    this.updateProduct.setData({});
  }

  editProduct() {
    if (this.productForm.valid) {
      this.api.updateProduct({...this.productForm.value, id: this.updateData._id})
        .subscribe({
          next: (res: any)=>{
            this.productForm.reset();
            this.router.navigate(['products']);
          },
          error: () => {
            console.log("Error occured");
          }
        })
    }
  }

  createProduct() {
    if (!this.updateData._id) {
      if (this.productForm.valid) {
        this.api.createNewProduct(this.productForm.value)
          .subscribe({
            next: (res: any)=>{
              this.productForm.reset();
              this.router.navigate(['products']);
            },
            error: () => {
              console.log("Error occured");
            }
          })
      }
    } else {
      this.editProduct()
    }
  }

}

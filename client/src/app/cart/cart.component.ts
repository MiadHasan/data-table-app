import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCartProducts().subscribe({
      next: (result: any) => {
        const arrayOfIds = result.map((item: any) => item.id);
        this.api.getProducts({ids: arrayOfIds}).subscribe({
          next: (res: any) => {
            result.map((item: any) => {
              res.forEach((element: any) => {
                if (element._id == item.id) {
                  element.count = item.count;
                }
              });
            })
            this.productData = res;
          }
        });
      }
    })
  }

  productData !: any;

  editQuantity(updateData: any) {
    this.api.updateProduct({id: updateData._id, quantity: updateData.quantity}).subscribe();
    this.api.updateCartProducts({
      id: updateData._id, 
      count: updateData.count
    }).subscribe();
    if (updateData.count == 0) {
      this.productData = this.productData.filter((item: any) => {
        return item.count != 0;
      });
    }
  }

}

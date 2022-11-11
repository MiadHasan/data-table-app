import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.api.getCartProducts().subscribe({
          next: (result: any) => {
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
      },
      error: (e) => {
        console.log(e);
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
  }

}

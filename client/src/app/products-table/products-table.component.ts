import { OnInit, Component, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import { ApiService } from '../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UpdateProductService } from '../services/update-product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(PageEvent) paginator!: PageEvent;
  displayedColumns = ['productName', 'productShortCode', 'price', 'quantity', 'createdDate', 'action'];

  constructor(private api: ApiService, private router: Router, private updateProduct: UpdateProductService) {
  }
  sortAndSizeObj: any = {
    sortBy: '',
    sortDirection: '',
    start: 0,
    size: 5
  };

  ngOnInit(): void {
    this.getRequiredProducts(this.sortAndSizeObj);
  }
  getRequiredProducts(data: any) {
    this.api.getProducts(data).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  changeSorting(sort: Sort) {
    this.sortAndSizeObj.sortBy = sort.active;
    this.sortAndSizeObj.sortDirection = sort.direction;
    this.getRequiredProducts(this.sortAndSizeObj);
  }

  changePage(page: PageEvent) {
    this.sortAndSizeObj.start = page.pageIndex * page.pageSize;
    this.sortAndSizeObj.size = page.pageSize;
    this.getRequiredProducts(this.sortAndSizeObj);
  }

  editProduct(row: any) {
    this.api.getProductById({id: row._id}).subscribe({
      next: (res) => {
        this.updateProduct.setData(res);
        this.router.navigate(['products/create']);
      }
    });
  }

  deleteProduct(id: any) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.getRequiredProducts(this.sortAndSizeObj);
      }
    })
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

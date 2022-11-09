import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ApiService } from '../services/api.service';

// TODO: Replace this with your own data model type
export interface ProductsTableItem {
  productName: string,
  productShortCode: string,
  price: number,
  quantity: number,
  createdDate: string
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsTableItem[] = [
  {productName: 'Chair', productShortCode: 'chr', price: 500, quantity: 50, createdDate: new Date("2022-11-06").toDateString()},
  {productName: 'Table', productShortCode: 'tb', price: 1000, quantity: 20, createdDate: new Date("2022-11-07").toDateString()},
  {productName: 'Fan', productShortCode: 'fan', price: 1200, quantity: 10, createdDate: new Date("2022-11-04").toDateString()},
  {productName: 'Bed', productShortCode: 'bed', price: 10000, quantity: 10, createdDate: new Date("2022-11-07").toDateString()},
  {productName: 'TV', productShortCode: 'televison', price: 5000, quantity: 50, createdDate: new Date("2022-11-07").toDateString()},
  {productName: 'Bag', productShortCode: 'bag', price: 800, quantity: 80, createdDate: new Date("2022-11-07").toDateString()}
];

/**
 * Data source for the ProductsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsTableDataSource extends DataSource<ProductsTableItem> {
  data: ProductsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductsTableItem[]): ProductsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductsTableItem[]): ProductsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'productName': return compare(a.productName, b.productName, isAsc);
        case 'productShortCode': return compare(a.productShortCode, b.productShortCode, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'quantity': return compare(+a.quantity, +b.quantity, isAsc);
        case 'createdDate': return compare(a.createdDate, b.createdDate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

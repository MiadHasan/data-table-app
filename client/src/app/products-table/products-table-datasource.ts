import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProductsTableItem {
  ProductName: string,
  ProductShortCode: string,
  Price: number,
  Quantity: number,
  CreatedDate: string
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsTableItem[] = [
  {ProductName: 'Chair', ProductShortCode: 'chr', Price: 500, Quantity: 50, CreatedDate: new Date("2022-11-07").toDateString()},
  {ProductName: 'Table', ProductShortCode: 'tb', Price: 1000, Quantity: 20, CreatedDate: new Date("2022-11-07").toDateString()},
  {ProductName: 'Fan', ProductShortCode: 'fan', Price: 1200, Quantity: 10, CreatedDate: new Date("2022-11-07").toDateString()},
  {ProductName: 'Bed', ProductShortCode: 'bed', Price: 10000, Quantity: 10, CreatedDate: new Date("2022-11-07").toDateString()},
  {ProductName: 'TV', ProductShortCode: 'televison', Price: 5000, Quantity: 50, CreatedDate: new Date("2022-11-07").toDateString()},
  {ProductName: 'Bag', ProductShortCode: 'bag', Price: 800, Quantity: 80, CreatedDate: new Date("2022-11-07").toDateString()}
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
        case 'ProductName': return compare(a.ProductName, b.ProductName, isAsc);
        case 'ProductShortCode': return compare(a.ProductShortCode, b.ProductShortCode, isAsc);
        case 'Price': return compare(+a.Price, +b.Price, isAsc);
        case 'Quantity': return compare(+a.Quantity, +b.Quantity, isAsc);
        case 'CreatedDate': return compare(a.CreatedDate, b.CreatedDate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

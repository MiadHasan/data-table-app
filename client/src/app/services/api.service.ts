import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createNewProduct(data: any) {
    return this.http.post('http://localhost:3000/products/create', data);
  }
  getProducts(data: any) {
    return this.http.post('http://localhost:3000/products', data);
  }
  getProductById(id: any) {
    return this.http.post('http://localhost:3000/product-by-id', id);
  }
  deleteProduct(id: any) {
    return this.http.delete('http://localhost:3000/products', {
      params: new HttpParams().set('id', id)
  });
  }
  updateProduct(data: any) {
    return this.http.put('http://localhost:3000/products', data);
  }
}

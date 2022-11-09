import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createNewProduct(data: any) {
    return this.http.post('http://localhost:3000/products/create', data);
  }
  getProducts() {
    return this.http.get('http://localhost:4200/products');
  }
}

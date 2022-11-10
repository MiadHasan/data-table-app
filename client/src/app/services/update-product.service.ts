import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor() { }
  previousData: object = {}
  setData(data: object) {
    this.previousData = data;
  }
  getData() {
    return this.previousData;
  }
}

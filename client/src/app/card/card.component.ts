import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (this.productInfo.count) {
      this.count = this.productInfo.count;
      this.showCartButton = false;
    }
  }

  @Output() updateQuantity = new EventEmitter()

  editQuantity(data: any) {
    this.updateQuantity.emit(data);
  }

  count = 0;
  showCartButton : boolean = true;
  @Input() productInfo !: any;
  isDisableIncrement = false;

  cartButtonClicked() {
    this.showCartButton = false;
    this.count += 1;
    this.productInfo.quantity -= 1;
    this.productInfo.count = this.count;
    this.editQuantity(this.productInfo);
  }

  incrementCounter() {
    this.count += 1;
    this.productInfo.quantity -= 1;
    this.productInfo.count = this.count;
    this.editQuantity(this.productInfo);
    if (this.productInfo.quantity == 0) {
      this.isDisableIncrement = true;
    }
  }

  decrementCounter() {
    this.count -= 1;
    this.productInfo.quantity += 1;
    this.isDisableIncrement = false;
    if (this.count == 0) {
      this.showCartButton = true;
    }
    this.productInfo.count = this.count;
    this.editQuantity(this.productInfo);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  gotoDashboard() {
    this.route.navigate(['dashboard'])
  }

  gotoProducts() {
    this.route.navigate(['products']);
  }

  gotoCart() {
    this.route.navigate(['cart']);
  }

}

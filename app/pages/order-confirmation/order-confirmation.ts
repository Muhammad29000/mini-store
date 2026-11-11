import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.css',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation implements OnInit {
  order = signal<any>(null);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedOrder = localStorage.getItem('ministore-order');

    if (savedOrder) {
      this.order.set(JSON.parse(savedOrder));
    } else {
      this.router.navigate(['/shop']);
    }
  }
}

import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {

  customer = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  };

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  totalPrice = computed(() =>
    this.cartService.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  placeOrder(): void {
    const order = {
      customer: this.customer,
      items: this.cartService.cartItems(),
      total: this.totalPrice(),
      date: new Date().toISOString()
    };

    localStorage.setItem('ministore-order', JSON.stringify(order));

    this.cartService.cartItems.set([]);

    this.router.navigate(['/order-confirmation']);
  }
}

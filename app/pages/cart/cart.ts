
import { Component, computed } from '@angular/core';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {

  constructor(public cartService: CartService) {}

  totalPrice = computed(() =>
    this.cartService.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  increaseQuantity(productId: number): void {
    const item = this.cartService.cartItems().find(
      item => item.product.id === productId
    );

    if (item) {
      this.cartService.cartItems.update(items =>
        items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  }

  decreaseQuantity(productId: number): void {
    this.cartService.cartItems.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  removeItem(productId: number): void {
    this.cartService.cartItems.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }
}

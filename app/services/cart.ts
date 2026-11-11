import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>(this.loadCart());

  constructor() {
    effect(() => {
      localStorage.setItem(
        'ministore-cart',
        JSON.stringify(this.cartItems())
      );
    });
  }

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem('ministore-cart');

    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }

    return [];
  }

  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const existingItem = items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }
}
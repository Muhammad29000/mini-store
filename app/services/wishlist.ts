import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItems = signal<Product[]>(this.loadWishlist());

  constructor() {
    effect(() => {
      localStorage.setItem(
        'ministore-wishlist',
        JSON.stringify(this.wishlistItems())
      );
    });
  }

  private loadWishlist(): Product[] {
    const savedWishlist = localStorage.getItem('ministore-wishlist');

    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch {
        return [];
      }
    }

    return [];
  }

  addToWishlist(product: Product): void {
    this.wishlistItems.update(items => {
      const alreadyExists = items.some(
        item => item.id === product.id
      );

      if (alreadyExists) {
        return items;
      }

      return [...items, product];
    });
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems.update(items =>
      items.filter(item => item.id !== productId)
    );
  }
}
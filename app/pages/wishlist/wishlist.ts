
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';

@Component({
  imports: [RouterLink],
  selector: 'app-wishlist',
  styleUrl: './wishlist.css',
  templateUrl: './wishlist.html',
})
export class Wishlist {

  constructor(public wishlistService: WishlistService) {}

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }
}

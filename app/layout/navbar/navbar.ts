import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  cartCount = computed(() =>
    this.cartService.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  wishlistCount = computed(() =>
    this.wishlistService.wishlistItems().length
  );
}
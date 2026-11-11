
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { Product } from '../../models/product';

@Component({
  imports: [RouterLink],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  product = signal<Product | null>(null);

  notification = signal('');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        console.log(data);
      },
      error: (error) => {
        console.log('API Error:', error);
      }
    });
  }

  addToCart(): void {
    const currentProduct = this.product();

    if (currentProduct) {
      this.cartService.addToCart(currentProduct);
      this.notification.set('Product added to cart successfully!');

      setTimeout(() => {
        this.notification.set('');
      }, 2500);
    }
  }

  addToWishlist(): void {
    const currentProduct = this.product();

    if (currentProduct) {
      this.wishlistService.addToWishlist(currentProduct);
      this.notification.set('Product added to wishlist!');

      setTimeout(() => {
        this.notification.set('');
      }, 2500);
    }
  }
}

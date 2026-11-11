import { Component, OnInit, signal, computed } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
})
export class Shop implements OnInit {

  products = signal<Product[]>([]);

  searchTerm = signal('');

  selectedCategory = signal('all');

  sortOrder = signal('default');

  categories = computed(() => [
    ...new Set(this.products().map(product => product.category))
  ]);

  filteredProducts = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    const sort = this.sortOrder();

    let result = this.products().filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search);

      const matchesCategory =
        category === 'all' || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === 'low-to-high') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === 'high-to-low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.log('API Error:', error);
      }
    });
  }
}
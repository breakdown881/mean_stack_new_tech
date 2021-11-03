import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: any;
  product: Object = {
    id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    instock: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct();
  }

  fetchProduct() {
    this.productService.getProductById(this.id).subscribe(res => {
      this.updateProductProperty(res.product);
    });
  }


  updateProductProperty(product) {
    this.product = product[0];
    console.log(this.product);
  }

}

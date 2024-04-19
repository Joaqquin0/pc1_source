import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from "../../model/product.entity";
import { FakestoreApiService } from '../../services/fakestore-api.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule], /*no se agrefga el product ni ApiService porque se importa todo lo que se usara en el html, y eso no va ahi*/
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

    products: Array<Product> = [];
    displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image','rate','count'];
    dataSource: any;

    constructor(private fakestoreApiService: FakestoreApiService) {

    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
      this.fakestoreApiService.getProducts().subscribe((data: any) => {
        this.products = data;
                  console.log(this.products);
        this.dataSource = new MatTableDataSource(this.products);
      });
    }

}

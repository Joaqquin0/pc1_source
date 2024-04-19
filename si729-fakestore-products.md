# Creación del Proyecto Fake-store

## Creación del proyecto y agregando Material Design (MacOS)

Cargar el `Terminal` de MacOS y ejecute las siguientes instrucciones:

```
cd /Users/alumnos/IdeaProjects
sudo ng new si729-fakestore-products
```

Which stylesheet format would you like to use? Seleccione la siguiente opción:

```
CSS  [ https://developer.mozilla.org/docs/Web/CSS
```

Do you want to enable Server-Side Rendering (SSR) and Static Site Generation 
(SSG/Prerendering)? Seleccione:

```
N
```

Luego ejecute las siguientes instrucciones:
```
cd si729-fakestore-products
sudo ng add @angular/material
```

Would you like to proceed?, digite:
```
Y
```

Choose a prebuilt theme name, or "custom" for a custom theme, seleccione:
```
Indigo/Pink  [ Preview: https://material.angular.io?theme=indigo-pink ]
```

Set up global Angular Material typography styles?, selecione:
```
Y
```

Include the Angular animations module?, selecione:
```
Include and enable animations
```

Luego ejecute las siguientes instrucciones:
```
cd ..
sudo chown -R alumnos ./si729-fakestore-products
```

## En el IDE IntelliJ IDEA Community

Cargar el IntelliJ IDEA y abra el proyecto ubicado en: `/Users/alumnos/IdeaProjects/si729-fakestore-products`  

Cargar el Terminal del IDE y ejecutar la siguiente instrucción:
```
ng serve
```

### Creación de componentes

En la carpeta `app` crear las carpetas: `products` y `public`.

En la carpeta `products` crear las carpetas: `components`, `model` y `services`-

En la carpeta `public` crear la carpeta: `components`.

En el Terminal del IDE crearemos los siguientes componentes:
```
ng generate component public/components/header-content --skip-tests=true
ng generate component public/components/footer-content --skip-tests=true
ng generate component products/components/product-list --skip-tests=true
```

En el Terminal del IDE crearemos el siguiente modelo:
```
ng generate class products/model/product --type=entity
```

En el Terminal del IDE crearemos el siguiente service:
```
ng generate service products/services/fakestore-api 
```

### Component header-content y footer-content

Agregar los siguientes imports a la clase `HeaderContentComponent` ubicado en el archivo `header-content.component.ts`
```typescript
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
```

Agregar las clases `MatToolbarModule, MatButtonModule, MatIconModule` en la variable `imports` de `@Component` de la clase `HeaderContentComponent` ubicado en el archivo `header-content.component.ts`

Reemplazar el contenido del archivo `header-content.component.html` con:
```html
<mat-toolbar color="primary">
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Fake Store</span>
  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>
```

Reemplazar el contenido del archivo `header-content.component.css` con:
```css
.example-spacer {
  flex: 1 1 auto;
}
```

Reemplazar el contenido del archivo `footer-content.component.html` con:
```html
<footer style="background-color: #333; color: #fff; text-align: center; padding: 10px;">
  <p>Copyright © 2024 Fake Store API, All rights reserved.</p>
  <p>Developed by DAOS</p>
</footer>

```


### Model product

Agregar los siguentes atributos y constructor a la clase `Product` ubicado en `product.entity.ts`
```typescript
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  count: number;

  constructor() {
    this.id = 0;
    this.title = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.image = '';
    this.rate = 0;
    this.count = 0;
  }
```

### Agregando el provide HttpClient al config

Agregar el siguiente import a la constante `appConfig` ubicado en el archivo `app.config.ts`
```typescript
import { provideHttpClient } from "@angular/common/http";
```

Agregar el método `provideHttpClient()` en la variable `providers` de la constante `appConfig` ubicado en el archivo `app.config.ts`

### Service FakestoreApi

Agregar los siguentes imports a la clase `FakestoreApiService` ubicado en el archivo `fakestore-api.service.ts`
```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
```

Agregar los siguentes atributos, constructor y métodos a la clase `FakestoreApiService` ubicado en el archivo `fakestore-api.service.ts`
```typescript
  private baseUrl = 'https://fakestoreapi.com'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }
```

### Component Product List

Agregar los siguientes imports a la clase `ProductListComponent` ubicado en el archivo `product-list.component.ts`
```typescript
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from "../../model/product.entity";
import { FakestoreApiService } from '../../services/fakestore-api.service';
```

Agregar las clases `MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule` en la variable `imports` de `@Component` de la clase `ProductListComponent` ubicado en el archivo `product-list.component.ts`

Agregar los siguentes atributos, constructor y métodos a la clase `ProductListComponent` ubicado en el archivo `product-list.component.ts`
```typescript
  products: Array<Product> = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image'];
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
      this.dataSource = new MatTableDataSource(this.products);
    });
  }
```

Reemplazar el contenido del archivo `product-list.component.html` con:
```html
<mat-card>
  <mat-card-content>

    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Ex. ium" #input>
    </mat-form-field>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Title </th>
        <td mat-cell *matCellDef="let element"> {{element.title}} </td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef> Price </th>
        <td mat-cell *matCellDef="let element"> {{element.price}} </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Category </th>
        <td mat-cell *matCellDef="let element"> {{element.category}} </td>
      </ng-container>

      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef> Image </th>
        <td mat-cell *matCellDef="let element"><img  width="30px" height="30px" src="{{element.image}}">   </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

      <!-- Row shown when there is no matching data. -->
      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
      </tr>
    </table>

  </mat-card-content>
</mat-card>
```

Reemplazar el contenido del archivo `product-list.component.css` con:
```css
table {
  width: 100%;
}

.mat-mdc-form-field {
  font-size: 14px;
  width: 100%;
}
```

### AppComponent

Agregar los siguientes imports a la clase `AppComponent` ubicado en el archivo `app.component.ts`
```typescript
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { ProductListComponent } from "./products/components/product-list/product-list.component";
```

Agregar las clases `HeaderContentComponent, FooterContentComponent, ProductListComponent` en la variable `imports` de `@Component` de la clase `AppComponent` ubicado en el archivo `app.component.ts`

Reemplazar el contenido del archivo `app.component.html` con:
```html
<app-header-content></app-header-content>
<app-product-list></app-product-list>
<app-footer-content></app-footer-content>
```


## Actividad

Agregar el model `Rating` de acuerdo al Json de respuesta: https://fakestoreapi.com/products 


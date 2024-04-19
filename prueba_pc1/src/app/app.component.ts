import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterContentComponent} from './public/components/footer-content/footer-content.component';
import {HeaderContentComponent} from './public/components/header-content/header-content.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterContentComponent, HeaderContentComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prueba_pc1';
}

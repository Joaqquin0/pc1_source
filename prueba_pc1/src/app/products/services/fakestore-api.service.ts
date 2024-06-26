import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakestoreApiService {

    private baseUrl = 'https://fakestoreapi.com'

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
      return this.http.get(`${this.baseUrl}/products`);
    }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { CategoriesDto } from '../model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { BaseQuerieResponse } from '../model/Common/BaseQuerieResponse';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService<CategoriesDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/categories`);
  }

  
  GetCart(){
    let jsonCart =sessionStorage.getItem('cart');
    if(jsonCart){
      return JSON.parse(jsonCart)
    }else{
      return []
    }
  }

  saveCart(cart:any){
    let jsonCart = JSON.stringify(cart);
    sessionStorage.setItem('cart',jsonCart)
  }

}

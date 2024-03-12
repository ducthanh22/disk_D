import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { OrderDto } from '../model/order';
import { Observable, first } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<OrderDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/order`);
  }
  getbyuser(id:number): Observable<any> {
    return this._http.get<any>(`${this.actionUrl}/getbyuser/${id}`).pipe(first());
  }

}
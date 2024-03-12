import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { BaseQuerieResponse } from '../model/Common/BaseQuerieResponse';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/products`);
  }
  Getbycategory(id: number, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('id', id.toString())  // Đảm bảo rằng keyword không bị undefined
    return this._http
      .get<BaseQuerieResponse<any>>(`${this.actionUrl}/getcategories`,{params})
      .pipe(first());
  }


  getNewproduct( page: number, pageSize: number): Observable<BaseQuerieResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
    return this._http
      .get<BaseQuerieResponse<any>>(`${this.actionUrl}/getnewproduct`,{params})
      .pipe(first());
  }

}

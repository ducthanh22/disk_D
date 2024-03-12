import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/comment`);
  }
  GetbyNews(id: number, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('id', id.toString())  // Đảm bảo rằng keyword không bị undefined
    return this._http
      .get<any>(`${this.actionUrl}/GetbyNews`,{params})
      .pipe(first());
  }
  

}
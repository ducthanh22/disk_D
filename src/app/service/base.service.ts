import { Observable, first } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseQuerieResponse } from '../model/Common/BaseQuerieResponse';
import { BaseCommandResponse } from '../model/Common/BaseCommandResponse';

export class BaseService<T> {

  constructor(protected _http: HttpClient, protected actionUrl: string) { }

//  sendRequestWithToken(path: string, method: string = 'GET', body?: any): Observable<any> {
//     const token = localStorage.getItem('Token');
//     console.log(token)
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     });
//     const url = `${this.actionUrl}${path}`;
//     return this._http.request(method, url, { body, headers });
//   }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.actionUrl}/getall`).pipe(first());
  }

  Search(keyword: string, page: number, pageSize: number): Observable<BaseQuerieResponse<T>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword || '')  // Đảm bảo rằng keyword không bị undefined
    return this._http
      .get<BaseQuerieResponse<T>>(`${this.actionUrl}/Search`,{params})
      .pipe(first());
  }
    create<T>(data: T): Observable<any> {
    return this._http
      .post<any>(`${this.actionUrl}/create`, data)
      .pipe(first());
  }

  getbyid<T>(id:number): Observable<T> {
    return this._http.get<T>(`${this.actionUrl}/getbyid/${id}`).pipe(first());
  }

  update<T>(data: T): Observable<BaseCommandResponse> {
    return this._http
      .post<BaseCommandResponse>(`${this.actionUrl}/update`, data)
      .pipe(first());
  }
  delete<T>(id:number): Observable<T> {
    return this._http.get<T>(`${this.actionUrl}/delete/${id}`).pipe(first());
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StatisticService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/thongke`);
  }
  getStatistics(data: any): Observable<any> {
    const params = new HttpParams({ fromObject: data });
  
    return this._http.get<any>(`${this.actionUrl}/Count`, { params });
  }

  getMonth(data: any): Observable<any> {
    const params = new HttpParams({ fromObject: data });
  
    return this._http.get<any>(`${this.actionUrl}/getmonth`, { params });
  }
  
}
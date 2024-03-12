import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { OrderDto } from '../model/order';
import { Observable, first } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NewsService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/news`);
  }
  

}
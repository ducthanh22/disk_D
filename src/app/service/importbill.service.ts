import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ImportBillService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/importbill`);
  }
}
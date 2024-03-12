import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private keywordSubject = new BehaviorSubject<string>(''); // Subject for communication
  constructor(private router: Router){
    
  }

  keyword$ = this.keywordSubject.asObservable();

  sendKeyword(keyword: string) {
    this.keywordSubject.next(keyword);
    // this.keyword();
    this.router.navigate(['/client/search']);
    
  }
}

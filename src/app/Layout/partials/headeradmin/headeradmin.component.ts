import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent {
// [x: string]: any;
informationToken:any
constructor(private router: Router,private LoginService: LoginService){}
ngOnInit(){
  this.informationToken= this.LoginService.decodeToken();
}

logout(){
  localStorage.clear();
  this.router.navigate(['/client/Home'])
}
}

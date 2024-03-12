import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  FormLogin!:FormGroup
  constructor(private LoginService:LoginService, private fb:FormBuilder,
    private router: Router){}
  ngOnInit(){
    this.FormLogin= this.fb.group({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    })
  }
  login() {
    if (this.FormLogin.valid) {
      const Login = this.FormLogin.value;
      this.LoginService.login(Login).subscribe({
        next: (res) => {
          if (res != null) {
            const token = res.token;
            localStorage.setItem('Token', token);  
            // // Giải mã phần base64 của token
            const tokenPayload = this.LoginService.decodeToken();
            // // Lấy thông tin từ payload
            const status = tokenPayload.status;      
            this.FormLogin.reset();
            if(status==1){
              this.router.navigate(['/client/Home']);
            }else{
           
                this.router.navigate(['/admin/dashboard']);
            }
          }
        },
        error: (e) => {
          console.error(e.errorMessage);
        },
      });
    }
  }
  
 
  
  

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  FormRegister!:FormGroup
constructor(private fb:FormBuilder, private AccountSV:LoginService){}
ngOnInit(){
  this.FormRegister=this.fb.group({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    sdt: new FormControl('',Validators.required),
    status: new FormControl(''),
  })
}

SaveAdd() {
  if (this.FormRegister.valid) {
    const register = this.FormRegister.value;
    register.status=1;
    this.AccountSV.create(register).subscribe({
      next: (res) => {
        if (res != null) {
          this.FormRegister.reset();
         alert('Đăng kí thành công')
        }
      },
      error: (e) => {
        e.errorMessage;
      },
    });
  }
}
}

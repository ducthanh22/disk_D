import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientClienttemplateComponent } from './client-clienttemplate/client-clienttemplate.component';
import { AdminAdmintemplateComponent } from './admin-admintemplate/admin-admintemplate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  // {path:'client',component:ClientClienttemplateComponent},
  { path: 'admin', component: AdminAdmintemplateComponent,title:'Admin' },
  {
    path: '',
    data: {
      title: 'Trang',
    },
    children: [
      {
        path: '',
        component: ClientClienttemplateComponent,
        data: {
          title: 'Client',
        },
        children: [
          {
            path: 'client',
            loadChildren: () =>
              import('../../modules/client/client.module').then(
                (x) => x.ClientModule
              ),
          },
          
        ],
      },
      {
        path: '',
        component: AdminAdmintemplateComponent,
        data: {
          title: 'Client',
        },
        children: [
          {
            path: 'admin',
            loadChildren: () =>
              import('../../modules/admin/admin.module').then(
                (x) => x.AdminModule
              ),
          },
          
        ],
      },
     
      
    ],
    
  },
  {path:'Login',component:LoginComponent,title:'Đăng nhập'},
  {path:'Register',component:RegisterComponent,title:'Đăng kí'},


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }

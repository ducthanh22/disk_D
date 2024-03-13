import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientClienttemplateComponent } from './Layout/template/client-clienttemplate/client-clienttemplate.component';

const routes: Routes = [
  // {path:'',redirectTo:'Login',pathMatch:'full'},

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
              import('../app/modules/client/client.module').then(
                (x) => x.ClientModule
              ),
          },
          
        ],
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

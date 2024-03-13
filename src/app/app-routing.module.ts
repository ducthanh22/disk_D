import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'client/Home',pathMatch:'full'},

  {
    path: '',
    data: {
      title: 'Default',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Layout/template/template.module').then(
            (x) => x.TemplateModule
          ),
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

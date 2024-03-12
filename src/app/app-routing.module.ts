import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'client/Home',pathMatch:'full'},
  {path:'/client/Home',redirectTo:'client/Home',pathMatch:'full'},


 
  // {path:'**',redirectTo:'load/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

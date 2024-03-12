import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';
import { ExportbillComponent } from './exportbill/exportbill.component';
import { ProducesComponent } from './produces/produces.component';
import { ImportbillComponent } from './importbill/importbill.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BlogsAdminComponent } from './blogs/blogs.component';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';






const routes: Routes = [
    {path:'dashboard',component:DashboardComponent},
    {path:'categories_admin',component:CategoriesComponent},
    {path:'products_admin',component:ProductsComponent},
    {path:'order_admin',component:OrderComponent},
    {path:'exportbill',component:ExportbillComponent},
    {path:'importbill',component:ImportbillComponent},

    {path:'produces',component:ProducesComponent},
    {path:'warehouse',component:WarehouseComponent},
    {path:'blog_admin',component:BlogsAdminComponent},
    {path:'customer',component:CustomerComponent},
    {path:'staff',component:StaffComponent},









   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

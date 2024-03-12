import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from 'src/app/service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ExportbillComponent } from './exportbill/exportbill.component';
import { ProducesComponent } from './produces/produces.component';
import { ImportbillComponent } from './importbill/importbill.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BlogsAdminComponent } from './blogs/blogs.component';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    OrderComponent,
    ExportbillComponent,
    ProducesComponent,
    ImportbillComponent,
    WarehouseComponent,
    BlogsAdminComponent,
    CustomerComponent,
    StaffComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    ChartModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    CategoriesService,  
  ],
 
})
export class AdminModule { }

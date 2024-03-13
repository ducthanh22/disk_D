import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories-client.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { DetailproductsComponent } from './detailproducts/detailproducts.component';
import { PayproductsComponent } from './payproducts/payproducts.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { SearchComponent } from './search/search.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';


const routes: Routes = [
  
  
      {
        path: 'Home',
        component:HomeComponent,
        title: 'Home',
      },
      {
        path: 'About',
        component: AboutComponent,
        title: 'About',
        
      },
      {
        path: 'categories/:id',
        component: CategoriesComponent,
        title: 'Categories',
       
      },
      {
        path: 'Service',
        component:ServiceComponent,
        title: 'Service',
      },
      {
        path: 'Blog',
        component:BlogComponent,
        title: 'Blog',
      },
      {
        path: 'Contact',
        component:ContactComponent,
        title: 'Contact',
      },
     {path:'Cart',component:CartComponent,title:'Cart'},

     {path:'Detail/:id',component:DetailproductsComponent,title:'Detail'},
     
     {path:'Pay',component:PayproductsComponent,title:'Pay'},

     {path:'Cart_detail',component:CartDetailComponent,title:'cart_detail'},
     {path:'Search',component:SearchComponent,title:'search'},

     {path:'Detail_blog/:id',component:DetailBlogComponent,title:'detail_blog'}



    
  

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

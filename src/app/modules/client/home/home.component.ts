import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService,LoginService, ProductService } from 'src/app/service';
import { ProducesService } from 'src/app/service/produces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  informationToken:any
  page: number = 1;
  pageSize: number = 6;
  datas!: any;
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray!: any[];
  loading: boolean = true;
  Carts: any = this.categoriesService.GetCart();
  constructor(private categoriesService: CategoriesService,private router: Router,private LoginService: LoginService,
    private ProductSV:ProductService ) { }

  ngOnInit() {
    
    this.GetNewProduct();
    this.informationToken= this.LoginService.decodeToken();
    this.logout();

  }

  logout(){
    if(this.informationToken.status!=1){
      localStorage.clear();
      this.router.navigate(['/client/Home'])
    }
  }
  GetNewProduct() {
    this.ProductSV.getNewproduct( this.page, this.pageSize).subscribe({
      next: (res) => {
        this.datas = res.rows;
        this.dataTotalRecords = res.count;
        this.totalPages = Math.ceil(res.count / this.pageSize);
        this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
    
    
  }
  Nextdata() {
    if (this.page < this.totalPages) {
      this.page = this.page + 1;
      this.GetNewProduct();
    }
  }
  Previousdata() {
    if (this.page > 0) {
      this.page = Math.max(1, this.page - 1);
      this.GetNewProduct();
    }
  }

  Setpage(setpage: number) {
    this.page = setpage
    this.GetNewProduct();
  }
  addtocart(data: any) {
    this.ProductSV.getbyid(data).subscribe({
      next: (res) => {
        let idx = this.Carts.findIndex((item: any) => {
          return item.res.id == data
        });
        if (idx >= 0) {
          this.Carts[idx].quantity += 1;
        } else {
          let cartItem: any = {
            res,
            quantity: 1,
          };
          this.Carts.push(cartItem)
        }
        console.log("cart", this.Carts)
        //luư vaod storage
        let jsonCart = JSON.stringify(this.Carts);
        sessionStorage.setItem('cart',jsonCart);
        alert('Thêm giỏ hàng thành công'); 
      }
    })
  }


}

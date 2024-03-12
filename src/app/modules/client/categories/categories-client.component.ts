import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/service';
import { LoginService } from 'src/app/service/login.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private route: ActivatedRoute,
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private Loginservice:LoginService
  ) { }


  Dscategories: any[] = [];
  id!: number;
  page: number = 1;
  pageSize: number = 6;
  datas!: any;
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray!: any[];
  loading: boolean = true;
  Carts: any = this.CategoriesService.GetCart();
  ngOnInit() {
    this.route.params.subscribe((params) => {

      if (params['id']) {
        this.id = +params['id'];  // Chuyển đổi id từ chuỗi sang số
      }
      this.getcategories(this.id);
    });
  }
  getcategories(id: number): void {
    this.ProductService.Getbycategory(this.id, this.page, this.pageSize).subscribe({
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
      this.getcategories(this.id);
    }
  }
  Previousdata() {
    if (this.page > 0) {
      this.page = Math.max(1, this.page - 1);
      this.getcategories(this.id);
    }
  }

  Setpage(setpage: number) {
    this.page = setpage
    this.getcategories(this.id);
  }
  addtocart(data: any) {
    this.ProductService.getbyid(data).subscribe({
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

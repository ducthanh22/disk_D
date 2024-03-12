import { Component } from '@angular/core';
import { CategoriesService, ProductService } from 'src/app/service';
import { ShareService } from 'src/app/service/core/share.service';
import { ProducesService } from 'src/app/service/produces.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 6;
  keyword: string = '';
  datas: any[] = [];
  dataTotalRecords!: number;
  Dscategories: any[] = [];
  totalPageArray: any[] = [];
  totalPages!: number;
  Carts: any = this.categoriesService.GetCart();
  receivedKeyword: string = '';
  // file:any
  constructor(private ProductService: ProductService,private categoriesService: CategoriesService,
    private ShareService:ShareService ) { }
  ngOnInit(){
    console.log('RouterOutletComponent ngOnInit called');
    this.ShareService.keyword$.subscribe(keyword => {
      this.receivedKeyword = keyword;
      this.loadData(this.receivedKeyword);
    });

  }
  // onSubmitSearch() {
  //   this.loadData(this.keyword);
  // };
  // load dữ liệu table
  loadData(keyword: string = '') {
    console.log('Keyword đã nhận được:', keyword);
    this.loading = true;
    this.ProductService.Search(keyword, this.page, this.pageSize).subscribe({
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
      this.loadData();
    }
  }
  Previousdata() {
    if (this.page > 0) {
      this.page = Math.max(1, this.page - 1);
      this.loadData();
    }
  }

  Setpage(setpage: number) {
    this.page = setpage
    this.loadData();
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

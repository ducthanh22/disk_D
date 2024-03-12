import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/service';
import { ProductService } from 'src/app/service/product.service';



@Component({
  selector: 'app-detailproducts',
  templateUrl: './detailproducts.component.html',
  styleUrls: ['./detailproducts.component.css']
})
export class DetailproductsComponent {

  id!:number;
  datas!:any;
  loading:boolean=true;
  
  Carts:any[]=[];

constructor(private route: ActivatedRoute,private ProductService:ProductService,
  private CategoriesService:CategoriesService){}

  ngOnInit() {
    this.Carts = this.CategoriesService.GetCart();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];  // Chuyển đổi id từ chuỗi sang số
      }
      this.getbyid(this.id);
    });
  }
  getbyid(id: number): void {
    this.ProductService.getbyid(this.id).subscribe({
      next: (res) => {
        if (res != null) {
          this.datas = res;
        }  
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
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

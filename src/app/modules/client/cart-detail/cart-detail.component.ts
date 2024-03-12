import { Component } from '@angular/core';
import { LoginService, OrderService } from 'src/app/service';
import { Order_detailService } from 'src/app/service/Order_detail.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent {
  informationToken:any;
  Dsorder:any[]=[];
  detail:any;

  
  constructor(
    private OrderService : OrderService,
    private LoginService:LoginService,
    private order_detail: Order_detailService) { }
  ngOnInit() {
   
    this.informationToken= this.LoginService.decodeToken();
    this.getorderUser(this.informationToken.id)
  }

    getorderUser(id:number){
      this.OrderService.getbyuser(id).subscribe({
        next:(res)=>{
          if(res!= null){
            this.Dsorder=res;
          }
        }
      })
    }
    getbydetail(x: number) {
      this.order_detail.getbyid(x).subscribe({
        next: (res) => {
          this.detail = res;
        }
      })
    }
}

import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoriesService } from 'src/app/service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  Carts: any[] = []
  constructor(private CategoriesService: CategoriesService, private router: Router) { }
  ngOnInit() {
    this.Carts = this.CategoriesService.GetCart();
    console.log(this.Carts)
  }

  Updatequantity(i: number, ev: any) {
    // let newquantity=ev.tag
    this.Carts[i].quantity = ev.target.value;
    this.CategoriesService.saveCart(this.Carts)
    console.log(ev.target.value)

  }
  Downquantity(i: number, quantity: any) {
    let newquantity = parseInt(quantity) - 1;

    newquantity = newquantity >= 0 ? newquantity : 0;
    this.Carts[i].quantity = newquantity;
    this.CategoriesService.saveCart(this.Carts)

    console.log(newquantity)

  }
  Upquantity(i: number, quantity: any) {
    let newquantity = parseInt(quantity) + 1;

    this.Carts[i].quantity = newquantity;
    this.CategoriesService.saveCart(this.Carts)

    console.log(newquantity)
  }
  Deletecart(i: number) {
    if (confirm('Bạn có muốn xóa không?')) {
      this.Carts.splice(i, 1);
      this.CategoriesService.saveCart(this.Carts)
    }
  }
  Deleteall(){
    if (confirm('Bạn có muốn xóa tất cả không?')) {
    sessionStorage.clear();
    this.Carts=[]
    }
  }
  navigatePay(){
    const token = localStorage.getItem('Token');
    if(token){
      this.router.navigate(['/client/pay']);
    }
    else{
      alert("Bạn cần phải đăng nhập")
    }

   

  }

}
                

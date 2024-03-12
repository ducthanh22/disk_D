import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDto, Order_detailsDto } from 'src/app/model';
import { CategoriesService, OrderService } from 'src/app/service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-payproducts',
  templateUrl: './payproducts.component.html',
  styleUrls: ['./payproducts.component.css']
})
export class PayproductsComponent {
  Carts: any[] = [];
  FormOrder!:FormGroup;
  informationToken:any;
  constructor(private CategoriesService: CategoriesService,
    private OrderService : OrderService,
    private LoginService:LoginService,
    private fb:FormBuilder) { }
  ngOnInit() {
    this.Carts = this.CategoriesService.GetCart();
    this.informationToken= this.LoginService.decodeToken();
    this.FormOrder= this.fb.group({
      address:new FormControl (this.informationToken.address,Validators.required),
      email:new FormControl (this.informationToken.email,Validators.required),
      fullname:new FormControl (this.informationToken.fullname,Validators.required),
      sdt:new FormControl (this.informationToken.sdt,Validators.required)

    })

  }

  getTotalPrice(): number {
    let Carts = this.CategoriesService.GetCart();
    let total: number = 0;
    Carts.forEach((item: any) => {
      total += item.res.Prices[0].Price_product * item.quantity;
    });
    return total;
  }
  SaveAdd() {
    // Assuming this.Carts is an array of items in the cart
    const cartItems = this.CategoriesService.GetCart();
    // Check if there are items in the cart
    if (cartItems.length > 0) {
      const orderDetails: Order_detailsDto[] = cartItems.map((item:any) => ({
        Id_Order: null, 
        Id_product: item.res.id, 
        Quantity: item.quantity, 
        Price: item.res.Prices[0].Price_product 
      }));
      // Create an order object
      const order: OrderDto = {
        Id_customer: this.informationToken.id,
        Price: this.getTotalPrice(),
        status:false,
        address: this.FormOrder.get('address')?.value,
        Order_details: orderDetails,
        id: null
      };
      this.OrderService.create(order).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormOrder.reset();
            this.Carts=[]
            this.CategoriesService.saveCart(this.Carts);
            alert('Đặt hàng thành công')
          }
        },
        error: (e) => {
          console.error(e); // Log the full error for debugging
          // Handle the error and provide user feedback if needed
        },
      });
    } else {
      // Handle the case where the cart is empty
      console.warn('The cart is empty. Cannot create an order.');
    }
  }

}

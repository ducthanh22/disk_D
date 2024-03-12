import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Detail_exportbillsDto, exportbillDto } from 'src/app/model';
import { OrderService } from 'src/app/service';
import { Order_detailService } from 'src/app/service/Order_detail.service';
import { ExportBillService } from 'src/app/service/exportbill.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  datas!: any[];
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray: any[] = [];
  order: any;
  detail: any;
  ExportBill!: exportbillDto;

  constructor(private OrderService: OrderService, private order_detail: Order_detailService,
    private ExportbillSv: ExportBillService) { }


  ngOnInit() {
    this.loadData();
  }
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.OrderService.Search(keyword, this.page, this.pageSize).subscribe({
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


   async getbydetail(x: any) {
  
    
    try {
      this.detail= await firstValueFrom(this.order_detail.getbyid(x))
      this.getbyid(this.detail[0].Id_Order);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    }
  }

  async getbyid(x: any) {
    // try {
    //   this.order = await this.OrderService.getbyid(x).toPromise();
    // } catch (error) {
    //   console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    // }
    try {
      this.order = await firstValueFrom(this.OrderService.getbyid(x));
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    }
  }
  // getTotalPrice(): number {
  //   let Carts = this.detail;
  //   let total: number = 0;
  //   Carts?.forEach((item: any) => {
  //     total += item.Price * item.Quantity;
  //   });
  //   return total;
  // }

  async CreateExportBill(x: any) {
     await this.getbydetail(x);
    if (this.detail != null) {
      const Detail_exportbills: Detail_exportbillsDto[] = this.detail.map((item: any) => ({
        Id_product: item.Id_product,
        Idproduct: item.Id_product,
        Quantity: item.Quantity,
        Price: item.Price
      }));
      const data: exportbillDto = {
        Id_customer: this.order.id,
        Price: this.order.Price,
        Detail_exportbills: Detail_exportbills,
        id: null
      };
      console.log(data)
      this.ExportbillSv.create(data).subscribe({
        next: (res) => {
          if (res != null) {
            alert('Thêm hóa đơn bán thành công')
          }
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.warn('Giỏ hàng trống');
    }
  }

  async update(x: number) {
    await this.getbyid(x);
    if (this.order) { // Kiểm tra xem this.order có giá trị không
        let data = this.order;
        data.status = 1;
        console.log(data)
        this.OrderService.update(data).subscribe({
            next: (res) => {
                if (res != null) {
                  this.loadData();
                    alert('Đổi trạng thái thành công');
                }
            }
        });
    }
    this.CreateExportBill(x);
    this.loadData();

}

}

import { Component } from '@angular/core';
import { importbillDto } from 'src/app/model';
import { LoginService, ProductService } from 'src/app/service';
import { ImportBillService } from 'src/app/service/importbill.service';
import { WarehoureService } from 'src/app/service/warehouse.service';
import { Warehoure_DetailService } from 'src/app/service/warehouse_detail.service';

@Component({
  selector: 'app-importbill',
  templateUrl: './importbill.component.html',
  styleUrls: ['./importbill.component.css']
})
export class ImportbillComponent {
  
  Dsporduct: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  dataTotalRecords!: number;
  datas:any[]=[];
  totalPages!: number;
  totalPageArray: any[] = [];
  title: string = ''

  importdata!:importbillDto
  infortoken:any;
  invoiceItems: any = [{ Idproduct:0, Price: 0 ,Quantity:0}];
  Dswarehouse:any[]=[]
  constructor(
    private importbillSV: ImportBillService,
    private LoginSV:LoginService,
    private ProductSV :ProductService,
    private warehouse_detailSV :Warehoure_DetailService,
    private WarehouseSV :WarehoureService) {
  }

  ngOnInit() {

    this.infortoken= this.LoginSV.decodeToken();
    this.loadData();
    this.Loadproduct();
    this.Loadwarehouse();
  }
  
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  Loadproduct(){
    this.ProductSV.getAll().subscribe({
      next:(res)=> {
        if(res!=null){
          this.Dsporduct=res
        }
      },
    })
  }
  Loadwarehouse(){
    this.WarehouseSV.getAll().subscribe({
      next:(res)=> {
        if(res!=null){
          this.Dswarehouse=res
        }
      },
    })
  }
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.importbillSV.Search(keyword, this.page, this.pageSize).subscribe({
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

  addInvoiceItem() {
    this.invoiceItems.push({ Idproduct: 0,Idwarehouse:0, Price: 0 ,Quantity:0});
  }

  removeInvoiceItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }
  reset(){
    this.invoiceItems=[{  Idproduct: 0,Idwarehouse:0, Price: 0 ,Quantity:0}]
  }
  getTotalPrice(): number {
 
    let total: number = 0;
    this.invoiceItems.forEach((item: any) => {
      total += item.Price * item.Quantity;
    });
    return total;
  }
  saveInvoice() {
    this.importdata = {
      id: null,
      Id_customer: this.infortoken?.id || 0, 
      Price: this.getTotalPrice(),
      Detail_importbills: this.invoiceItems
    };
    this.importbillSV.create(this.importdata).subscribe({
      next:(res)=>{
        if(res != null){
          this.SaveWare_detail(this.importdata)
          this.loadData();
          this.reset();
          alert("Thêm hóa đơn nhập thành công")
        }
      }
    })
    
    console.log('Invoice Items:', this.invoiceItems);
  }
  SaveWare_detail(data:any){
    this.warehouse_detailSV.create(data).subscribe({
      next:(res)=>{
        if(res != null){
          this.loadData();
        }
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehoureService } from 'src/app/service/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
 DSwarehouse: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  dataTotalRecords!: number;

  datas:any[]=[];
  totalPages!: number;
  totalPageArray: any[] = [];
  FormWarehose!:FormGroup
  
  constructor(
    private WarehouseSV: WarehoureService,
    private fb :FormBuilder) {
  }

  ngOnInit() {
    // this.LoadCategories();
    this.loadData();
    this.FormWarehose= this.fb.group({
      id:[''],
      Name:['',Validators.required],
      Address:['',Validators.required]
    })
  }


  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.WarehouseSV.Search(keyword, this.page, this.pageSize).subscribe({
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

  SaveAdd() {
    if (this.FormWarehose.valid) {
      const warehouse = this.FormWarehose.value;
      this.WarehouseSV.create(warehouse).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormWarehose.reset();
            this.loadData();
            alert('Thêm kho thành công')
          }
        },
        error: (e) => {
          e.errorMessage;
        },
      });
    }
  }
  edit(x: any) {
    this.FormWarehose.controls['id'].setValue(x.id);
    this.FormWarehose.controls['Name'].setValue(x.Name);
    this.FormWarehose.controls['Address'].setValue(x.Address);

  }

  Update() {
    if (this.FormWarehose.valid) {
      const warehouse = this.FormWarehose.value;
      this.WarehouseSV.update(warehouse).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormWarehose.reset();
            this.loadData();
            alert('Sửa kho thành công')
          }
        },
        error: (e) => {
          e.errorMessage;
        },
      });
    }
  }
  
}

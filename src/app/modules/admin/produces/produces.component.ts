import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProducesService } from 'src/app/service/produces.service';

@Component({
  selector: 'app-produces',
  templateUrl: './produces.component.html',
  styleUrls: ['./produces.component.css']
})
export class ProducesComponent {

  Dsproduce: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  datas: any[] = [];
  dataTotalRecords!: number;
  FormProduce!: FormGroup;
  name!: string;

  showAlert: boolean = false;

  totalPages!: number;
  totalPageArray: any[] = [];
  title: string = ''
  constructor(
    private producesService: ProducesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.LoadCategories();
    this.loadData();
    this.FormProduce = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),

    });

  }



  //Timf kiếm
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.producesService.Search(keyword, this.page, this.pageSize).subscribe({
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

  edit(x: any) {
    this.FormProduce.controls['id'].setValue(x.id);
    this.FormProduce.controls['Name'].setValue(x.Name);
    this.FormProduce.controls['Address'].setValue(x.Address);
    this.FormProduce.controls['Email'].setValue(x.Email);
  }

  SaveAdd() {
    if (this.FormProduce.valid) {
      const produces = this.FormProduce.value;
      this.producesService.create(produces).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormProduce.reset();
            this.loadData()
           alert("Thêm thành công")
          }
        },
        error: (e) => {
          e.errorMessage;
        },
      });
    }
  }

  Update() {
    if (this.FormProduce.valid) {
      const produces = this.FormProduce.value;
      this.producesService.update(produces).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormProduce.reset();
            this.loadData();
            alert("Sửa thành công")
            
          }
        },
        error: (e) => {
          e.errorMessage;
        },
      });
    }
  }

  delete(x: any) {
    if (confirm('Bạn có muốn xóa không?')) {
      this.producesService.delete(x.id).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormProduce.reset();
            this.loadData();
            alert("Xóa thành công")
          }
        }
      })
    }
  }
}

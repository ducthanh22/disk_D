import { Component, ViewChild } from '@angular/core';
import { CategoriesDto } from 'src/app/model';

import { CategoriesService } from 'src/app/service';
// import { PrimeIcons, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';






@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @ViewChild('dt') table!: Table;
  Dscategories: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  Categories!: CategoriesDto[];
  datas: CategoriesDto[] = [];
  dataTotalRecords!: number;

  FormCategories!: FormGroup;
  messageService: any;
  name!: string;

  showAlert: boolean = false;
  categoryData!: CategoriesDto;
  totalPages!: number;
  totalPageArray: any[] = [];
  title: string = ''
  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.LoadCategories();
    this.loadData();
    this.FormCategories = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
    });

  }


  // LoadCategories() {
  //   this.categoriesService.getAll().subscribe((data) => {
  //     this.Dscategories = data
  //   })
  // }
  //Timf kiếm
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.categoriesService.Search(keyword, this.page, this.pageSize).subscribe({
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
    this.FormCategories.controls['id'].setValue(x.id);
    this.FormCategories.controls['name'].setValue(x.name);
  }

  SaveAdd() {
    if (this.FormCategories.valid) {
      const categiries = this.FormCategories.value;
      this.categoriesService.create(categiries).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormCategories.reset();
            this.loadData()
            this.title = 'Thêm thành công';
            this.addSuccess()
          }
        },
        error: (e) => {
          e.errorMessage;
        },
      });
    }
  }

  Update() {
    if (this.FormCategories.valid) {
      const categiries = this.FormCategories.value;
      this.categoriesService.update(categiries).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormCategories.reset();
            this.title = 'Sửa thành công ';
            // this.table.reset();
            this.loadData()
            this.addSuccess();
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
      this.categoriesService.delete(x.id).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormCategories.reset();
            this.loadData();
            this.title = 'Xóa thành công';
            this.addSuccess();
          }
        }
      })
    }
  }

  addSuccess() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }
}

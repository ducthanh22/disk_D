import { Component } from '@angular/core';
import { ExportBillService } from 'src/app/service/exportbill.service';

@Component({
  selector: 'app-exportbill',
  templateUrl: './exportbill.component.html',
  styleUrls: ['./exportbill.component.css']
})
export class ExportbillComponent {

  Dscategories: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  dataTotalRecords!: number;

  datas:any[]=[];
  totalPages!: number;
  totalPageArray: any[] = [];
  title: string = ''
  constructor(
    private exportbill: ExportBillService) {
  }

  ngOnInit() {
    // this.LoadCategories();
    this.loadData();
  }


  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.exportbill.Search(keyword, this.page, this.pageSize).subscribe({
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

}

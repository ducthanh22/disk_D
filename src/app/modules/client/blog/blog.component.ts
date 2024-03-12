import { Component } from '@angular/core';
import { LoginService } from 'src/app/service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(private NewSV : NewsService,private LoginService :LoginService) { }


  Dscategories: any[] = [];
  keyword: string='';
  page: number = 1;
  pageSize: number = 6;
  datas!: any;
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray!: any[];
  loading: boolean = true;
  informationToken!:any;
  ngOnInit() {
    this.loadData();
    // this.informationToken= this.LoginService.decodeToken();
  }
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.NewSV.Search(keyword, this.page, this.pageSize).subscribe({
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

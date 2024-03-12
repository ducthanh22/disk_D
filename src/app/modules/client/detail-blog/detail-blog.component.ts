import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service';
import { CommentService } from 'src/app/service/comment.service';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent {
  datas: any;
  id!: number;
  loading: boolean = true;
  informationToken!: any;
  page: number = 1;
  pageSize: number = 6;
  CommentBlog:any;
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray!: any[];
  Comment = {
    Id_user: 0,
    // Id_product:0,
    Id_news: 0,
    Content: ''
  }
  constructor(private route: ActivatedRoute, private NewSV: NewsService,
    private LoginService: LoginService, private CommentSV: CommentService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];  // Chuyển đổi id từ chuỗi sang số
      }
      this.getbyid(this.id);
      this.GetbyNew(this.id)
    });
    this.informationToken = this.LoginService.decodeToken();
  }
  getbyid(id: number): void {
    this.NewSV.getbyid(this.id).subscribe({
      next: (res) => {
        if (res != null) {
          this.datas = res;
        }
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  AddComment() {
    this.Comment.Id_user = this.informationToken.id;
    this.Comment.Id_news = this.id;
    this.CommentSV.create(this.Comment).subscribe({
      next: (res) => {
        if (res != null) {
          this.GetbyNew(this.id);
          this.Comment.Content=''
          alert('Bình luận thành công')
        }
      }
    })

  }
  GetbyNew(id:number){
    this.CommentSV.GetbyNews(this.id, this.page, this.pageSize).subscribe({
      next: (res) => {
        this.CommentBlog = res.rows;
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

}

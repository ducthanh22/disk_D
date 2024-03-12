import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsAdminComponent {
  public Editor = ClassicEditor;

  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  datas: any[] = [];
  dataTotalRecords!: number;
  Dscategories: any[] = [];
  totalPageArray: any[] = [];
  totalPages!: number;
  FormBlog!: FormGroup;
  Dsproduces: any[] = [];
  urlFist!: string;
  selectedFile!: File | null;
  formData: FormData = new FormData();
  getid!: number;
  detailsp: any;
  // file:any
  constructor(private NewSV: NewsService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.loadData();
    this.FormBlog = this.fb.group({
      Id: [''],
      Title: ['', Validators.required],
      Content: ['', Validators.required],
      Image: ['',Validators.required],
    });

  }

  resetForm(){
    this.FormBlog.reset()
  }
  edit(x: any) {
    this.FormBlog.controls['Id'].setValue(x.id);
    this.FormBlog.controls['Title'].setValue(x.Title);
    this.FormBlog.controls['Content'].setValue(x.Content);
    this.FormBlog.controls['Image'].setValue(x.Image);

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
  onFileSelected(event: any): void {
    const fileInput: HTMLInputElement = event.target;
    this.selectedFile = fileInput.files?.[0] || null;
  }

  SaveAdd() {
    if (this.selectedFile) {
      const updatedData = this.FormBlog.value;
      this.formData = new FormData();
      this.formData.append('Title', updatedData.Title);
      this.formData.append('Content', updatedData.Content);
      this.formData.append('Image', this.selectedFile || '');
      this.NewSV.create(this.formData).subscribe({
        next: (res) => {
          if (res != null) {
            // this.getid = res.id
            this.FormBlog.reset();
            this.loadData();
            alert('Lưu thành công')
          }
        },
        error: (e) => {
          console.error('Error:', e);
        },
      });
    }

  }

  Update() {
    const updatedData = this.FormBlog.value;
    this.formData = new FormData();
    this.formData.append('Id', updatedData.Id);
    this.formData.append('Title', updatedData.Title);
    this.formData.append('Content', updatedData.Content);
    this.formData.append('Image', this.selectedFile || '');
    this.NewSV.update(this.formData).subscribe({
      next: (res) => {
        if (res != null) {
          this.FormBlog.reset();
          this.loadData();
          alert('Sửa thành công')
        }
      },
      error: (e) => {
        console.error('Error:', e);
      },
    });
  }

  Delete(id: number) {
    if (confirm('Bạn có muốn xóa không?')) {
      this.NewSV.delete(id).subscribe({
        next: (res) => {
          if (res != null) {
            this.detailsp = res;
            this.loadData();
            alert('Xóa thành công')

          }
        }
      })
    }
  }
}

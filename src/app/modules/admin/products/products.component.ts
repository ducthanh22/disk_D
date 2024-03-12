import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service';
import { ProducesService } from 'src/app/service/produces.service';
import { ProductService } from 'src/app/service/product.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

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
  FormProduts!: FormGroup;
  Dsproduces: any[] = [];
  urlFist!: string;
  selectedFile!: File | null;
  formData: FormData = new FormData();
  getid!: number;
  detailsp: any;
  // file:any
  constructor(private ProductService: ProductService, private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private ProducesService: ProducesService) { }

  ngOnInit() {
    this.LoadCategories();
    this.LoadProduces();
    this.loadData();
    this.FormProduts = this.fb.group({
      Id: [''],
      Id_Price: [''],
      Id_Color: [''],
      Id_Size: [''],
      Name: ['', Validators.required],
      Idcategories: ['', Validators.required],
      Idproduces: ['', Validators.required],
      Describe: ['', Validators.required],
      NameSize: ['', Validators.required],
      Price_product: ['', Validators.required],
      ColorName: ['', Validators.required],
      Image: ['',Validators.required],
    });

  }


  LoadCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.Dscategories = data
    })
  }
  LoadProduces() {
    this.ProducesService.getAll().subscribe((data) => {
      this.Dsproduces = data
    })
  }
  resetForm(){
    this.FormProduts.reset()
  }
  edit(x: any) {
    this.FormProduts.controls['Id'].setValue(x.id);
    this.FormProduts.controls['Id_Price'].setValue(x.Prices[0].id);
    this.FormProduts.controls['Id_Color'].setValue(x.Colors[0].id);
    this.FormProduts.controls['Id_Size'].setValue(x.Sizes[0].id);
    this.FormProduts.controls['Name'].setValue(x.Name);
    this.FormProduts.controls['Idcategories'].setValue(x.Idcategories);
    this.FormProduts.controls['Idproduces'].setValue(x.Idproduces);
    this.FormProduts.controls['Describe'].setValue(x.Describe);
    this.FormProduts.controls['NameSize'].setValue(x.Sizes[0]?.NameSize);
    this.FormProduts.controls['Price_product'].setValue(x.Prices[0]?.Price_product);
    this.FormProduts.controls['ColorName'].setValue(x.Colors[0]?.ColorName);
    // this.FormProduts.controls['Image'].setValue(x.Image);
  }
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.ProductService.Search(keyword, this.page, this.pageSize).subscribe({
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
      const updatedData = this.FormProduts.value;
      this.formData = new FormData();
      this.formData.append('Name', updatedData.Name);
      this.formData.append('Idcategories', updatedData.Idcategories);
      this.formData.append('Idproduces', updatedData.Idproduces);
      this.formData.append('Describe', updatedData.Describe);
      this.formData.append('NameSize', updatedData.NameSize);
      this.formData.append('Price_product', updatedData.Price_product);
      this.formData.append('ColorName', updatedData.ColorName);
      this.formData.append('Image', this.selectedFile || '');
      this.ProductService.create(this.formData).subscribe({
        next: (res) => {
          if (res != null) {
            this.getid = res.products.id
            console.log(this.getid)
            this.FormProduts.reset();
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
    const updatedData = this.FormProduts.value;
    this.formData = new FormData();
    this.formData.append('Id', updatedData.Id);
    this.formData.append('Id_Price', updatedData.Id_Price);
    this.formData.append('Id_Color', updatedData.Id_Color);
    this.formData.append('Id_Size', updatedData.Id_Size);
    this.formData.append('Name', updatedData.Name);
      this.formData.append('Idcategories', updatedData.Idcategories);
      this.formData.append('Idproduces', updatedData.Idproduces);
      this.formData.append('Describe', updatedData.Describe);
      this.formData.append('NameSize', updatedData.NameSize);
      this.formData.append('Price_product', updatedData.Price_product);
      this.formData.append('ColorName', updatedData.ColorName);
      this.formData.append('Image', this.selectedFile || '');
    this.ProductService.update(this.formData).subscribe({
      next: (res) => {
        if (res != null) {
          this.FormProduts.reset();
          this.loadData();
          alert('Sửa thành công')
        }
      },
      error: (e) => {
        console.error('Error:', e);
      },
    });
  }

  Deletemanytable(id: number) {
    if (confirm('Bạn có muốn xóa không?')) {
      this.ProductService.getbyid(id).subscribe({
        next: (res) => {
          if (res != null) {
            this.detailsp = res;
            this.DeleteProduct(this.detailsp);
            this.DeletePrice(this.detailsp);
            this.DeleteSize(this.detailsp);
            this.loadData();
            alert('Xóa thành công')

          }
        }
      })
    }
  }
  DeleteProduct(data: any) {
    this.ProductService.delete(data.id).subscribe({
      next: (res) => {
        if (res != null) {
          this.loadData();
        }
      }
    })
  }
  DeleteSize(data: any) {
    this.ProductService.delete(data.Sizes[0].id).subscribe({
      next: (res) => {
        if (res != null) {
          this.loadData();
        }
      }
    })
  }
  DeletePrice(data: any) {
    this.ProductService.delete(data.Prices[0].id).subscribe({
      next: (res) => {
        if (res != null) {
          this.loadData();
        }
      }
    })
  }
}


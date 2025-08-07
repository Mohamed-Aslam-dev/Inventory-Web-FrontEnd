import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {

  companyName: string = '';

  productName: string = ''; // bound to input

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.companyName = this.route.snapshot.paramMap.get('name')!;
  }

  onSubmit() {
    this.http.post('http://localhost:8080/inventory/add-row', {
    companyName: this.companyName,
    productName: this.productName
  }, { responseType: 'text' }).subscribe(
    res => {
      console.log('✅ Row added:', res);
      alert('Row added: ' + res);
      this.productName = ''; // clear input if needed
    },
    err => {
      console.error('❌ Error:', err);
      alert('Failed to add row');
    }
  );

  }

}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-order',
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './note-order.html',
  styleUrl: './note-order.css'
})
export class NoteOrder {

  constructor(private http: HttpClient, private router: Router) {}

  csvFiles: string[]=[];

  ngOnInit(){
    this.http.get<string[]>('https://manageinventoryapp.onrender.com/inventory/list-csv-files')
      .subscribe({
        next: (data)=>{
          this.csvFiles = data;  
        },
        error: (er) =>{
          console.error('Error fetching CSV file list', er);
        }
      })
  }
  products: any[] = [];
  fileName: string = '';

loadCSV(fileName: string) {
  this.fileName = fileName;
  this.http
    .get<string[]>(`https://manageinventoryapp.onrender.com/inventory/products/${fileName}`)
    .subscribe((data) => {
      this.products = data.map((name) => ({
        name: name,
        qty: 0
      }));
    });
}

// companyName: String = '';
proceedToPDF() {
  const hasQty = this.products.some(product => product.qty > 0);
  if (!hasQty) {
    alert("⚠️ Please enter at least 1 quantity before downloading PDF.");
    return;
  }

  const payload = {
    companyName: this.fileName,
    products: this.products.filter(p => p.qty > 0)
      .map(p => ({
        productName: p.name,
        productQuantity: p.qty,
        
      }))
  };

  this.http.post('https://manageinventoryapp.onrender.com/inventory/generate-pdf', payload, {
    responseType: 'blob'
  }).subscribe({
    next: (res: Blob) => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.fileName}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      this.products.forEach(p => p.qty = 0); // Optional reset
    },
    error: (err) => {
      console.error('PDF download error:', err);
    }
  });
}


}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-item.html',
  styleUrl: './add-item.css'
})

export class AddItem {

  companyName: string = '';
  responseMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const payload = {
      companyName: this.companyName
    };

    this.http.post('https://manageinventoryapp.onrender.com/inventory/create-csv', payload, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.responseMsg = res;
          this.companyName = '';
        },
        error: (err) => {
          console.error(err);
          this.responseMsg = 'Something went wrong';
        }
      });
  }

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

  // selectedCompany: string = '';
  // productName: string = '';

  // selectCompany(name: string) {
  //   this.selectedCompany = name;
  //   // Show product input form (you can toggle a modal or show/hide a div)
  // }

  goToCompany(companyName: string) {
  this.router.navigate(['/company', companyName]);
}

}

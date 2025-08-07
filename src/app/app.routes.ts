import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItem } from './add-item/add-item';
import { Dashboard } from './dashboard/dashboard';
import { ProductDetail } from './product-detail/product-detail';
import { NoteOrder } from './note-order/note-order';

export const routes: Routes = [
    { path: 'add-item', component: AddItem },
    { path: '', component: Dashboard },
    { path: 'company/:name', component: ProductDetail },
    { path: 'note-order', component: NoteOrder },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
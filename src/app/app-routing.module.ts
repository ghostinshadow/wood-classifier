import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

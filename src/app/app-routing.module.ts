import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "@app/login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

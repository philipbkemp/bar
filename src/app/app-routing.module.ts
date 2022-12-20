import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "@app/login/login.component";
import { MenuComponent } from "@app/menu/menu.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "menu", component: MenuComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

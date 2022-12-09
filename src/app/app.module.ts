import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { FormsModule } from "@angular/forms";

import { AppConfigService } from "@app/services/config.service";
import { LoginComponent } from "@app/login/login.component";

export function appConfigInit(config:AppConfigService) {
  return() => {
    return config.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    FormsModule
  ],
  exports: [
    TranslocoRootModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [ AppConfigService ]
    },
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

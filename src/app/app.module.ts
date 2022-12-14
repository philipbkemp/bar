import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { FormsModule } from "@angular/forms";

import { AppConfigService } from "@app/services/config.service";
import { LoginComponent } from "@app/login/login.component";

import { LanguageSelectorComponent } from "@app/language/language.component";
import { LoaderComponent } from "@app/loader/loader.component";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ToasterComponent } from "@app/templates/ptoast/ptoast.template";

export function appConfigInit(config:AppConfigService) {
  return() => {
    return config.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LanguageSelectorComponent,
    LoaderComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  exports: [
    TranslocoRootModule,
    ToasterComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [ AppConfigService ]
    },
    Title,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

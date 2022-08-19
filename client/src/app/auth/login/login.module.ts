import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [LoginComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

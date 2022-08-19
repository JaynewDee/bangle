import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup.component';
@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [SignupComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpAuthService } from './http/http.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent, AuthComponent],
  providers: [HttpAuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

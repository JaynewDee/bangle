import { Component } from '@angular/core';
import { HttpAuthService } from './http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '|BIRD:HOME|';
  btnText = 'BLEEP BLOOP!';
  users: any;
  constructor(private authService: HttpAuthService) {}
  logBtnText() {
    console.log(this.btnText);
  }

  async downloadUsers() {
    await this.authService.getAllUsers();
    this.users = this.authService.getUserStore();
    this.logLocal();
  }

  async logLocal() {
    console.log(this.users);
  }
}

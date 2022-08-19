import { Component, OnInit } from '@angular/core';
import { HttpAuthService } from '../http/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  btnText = 'BLEEP BLOOP!';
  users: any;
  constructor(private authService: HttpAuthService) {}
  logBtnText() {
    console.log(this.btnText);
  }

  async downloadUsers() {
    await this.authService.getAllUsers();
    this.users = this.authService.getUserStore();
  }

  async logLocal() {
    console.log(this.users);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}
}

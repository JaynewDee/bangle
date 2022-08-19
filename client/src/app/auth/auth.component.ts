import { Component, Input, OnInit } from '@angular/core';
import { HttpAuthService } from '../http/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  btnText = 'BLEEP BLOOP!';
  @Input()
  users: any;
  constructor(private authService: HttpAuthService) {}
  logBtnText() {
    console.log(this.btnText);
  }

  async downloadUsers() {
    await this.authService.getAllUsers();
    await this.authService.setUserStore();
  }

  async populateUsers() {
    this.users = await this.authService.getUserStore();
  }

  ngOnInit(): void {
    this.populateUsers();
  }
}

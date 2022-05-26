import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccessControlService } from 'src/app/services/access-control-service/access-control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginResponse = new EventEmitter<boolean>();
  logged: boolean = false;
  fail: boolean = false;

  login(email: string, password: string): void {
    this.accessControlService.login(email, password)
      .subscribe(response => this.logged = response);
    if (this.logged) {
      this.fail = false;
      this.loginResponse.emit(true);
    } else {
      this.fail = true;
    }
  }

  constructor(
    private accessControlService: AccessControlService
  ) { }

  ngOnInit(): void {
    this.accessControlService.preLogin();
  }

}

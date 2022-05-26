import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccessControlService } from 'src/app/services/access-control-service/access-control.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  newPassword: string = "";
  newPassword2: string = "";
  equalPasswords: boolean = false;
  fail: boolean = false;
  changed: boolean = false;

  checkPasswords(): void {
    if (this.newPassword == this.newPassword2 && this.newPassword.length >= 1) {
      this.equalPasswords = true;
    } else {
      this.equalPasswords = false;
    }
  }

  resetChanged(): void {
    this.changed = false;
  }

  changePassword(userEmail: string, oldPassword: string): void {
    if (this.equalPasswords) {
      this.accessControlService.changePassword(userEmail, oldPassword, this.newPassword)
        .subscribe(response => this.changed = response);
      if (this.changed) {
        this.fail = false;
      } else {
        this.fail = true;
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  constructor(
    private location: Location,
    private accessControlService: AccessControlService
  ) { }

  ngOnInit(): void {
    this.accessControlService.preLogin();
  }

}

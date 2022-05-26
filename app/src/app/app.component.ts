import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Delivery Manager';
  logged: boolean = false;

  logout(): void {
    this.logged = false;
  }

  onLogin(logged: boolean) {
    if (logged) {
      this.logged = true;
    }
  }
}

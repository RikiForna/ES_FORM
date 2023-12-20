import { Component,Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ES_Form';

  showLogin: boolean = true;

  ChangeComponents() {
    this.showLogin = !this.showLogin;
  }
}

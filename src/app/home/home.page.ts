import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  constructor( public auth: AuthService, private router: Router, public userService: UserService) { 
  }

  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl("/",{replaceUrl: true});
  }

}

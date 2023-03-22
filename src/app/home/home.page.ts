import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userEmail:any;
  
  constructor( public auth: AuthService, private router: Router, public userService: UserService) { 
    this.userService.getUser().valueChanges().subscribe((res:any)=>{
      this.userEmail = res.email.replace("@student.dkit.ie","").toUpperCase();
    });
  }

  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl("/",{replaceUrl: true});
  }

}

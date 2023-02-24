import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userEmail: any;
  userId: any;
 
  constructor(private db: AngularFireDatabase, private auth: Auth, private authService: AuthService ) {
    this.userId = this.authService.currentUserId();
    
    this.getUser().valueChanges().subscribe((res:any) => {
      this.userEmail = res.email;
    });
   
   }

  createUser(uid:any, email:any){
    this.db.object("users/"+uid).set({
      email: email
    });
  }

  getUser() {
    const user = this.auth.currentUser;
    return this.db.object("users/"+user?.uid);
  }

  getUsers(){
    return this.db.list("users");
  }
}
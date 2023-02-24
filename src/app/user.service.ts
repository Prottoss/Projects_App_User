import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFireDatabase, private auth: Auth ) { }

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

  addVehicleToUser(reg:any){
    const user = this.auth.currentUser;
    this.db.list("users/"+user?.uid+"/vehicles/").push({reg: reg});
  }

  getVehicles(){
    const user = this.auth.currentUser;
    return this.db.list("users/"+user?.uid+"/vehicles");
  }
}
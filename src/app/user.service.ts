import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersListRef!: AngularFireList<any>;
  usersRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase ) {
    this.usersListRef = db.list("/users");
  }

  createUser(uid:any, email:any){
    this.usersListRef.push({
      uid: uid,
      email: email,
    });
  }

  getUsers(){
    return this.usersListRef = this.db.list("/users");
  }

  getUser(id: string){
    return this.usersRef = this.db.object("/users"+id);
  }

  deleteUser(id: string){
    this.usersRef = this.db.object("users"+id);
    this.usersRef.remove();
  }
}
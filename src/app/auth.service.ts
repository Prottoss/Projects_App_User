import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  async register({email, password}: any){
    try{
      const user = await this.auth.createUserWithEmailAndPassword(email,password);
      return user;
    }
    catch(e){
      return null;
    }   
  }
  
  async login({email, password}: any){
    try{
      const user = await this.auth.signInWithEmailAndPassword(email,password);
      return user;
    }
    catch(e){
      return null;
    }  
  }

  logout(){
    return this.auth.signOut();
  }
}



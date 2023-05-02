import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  carFound:any;

  constructor(private db: AngularFireDatabase, private auth: Auth ) { }

  //User functions
  createUser(uid:any, email:any){
    this.db.object("users/"+uid).set({
      uid: uid,
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

  //User vehicle functions
  addVehicleToUser(reg:string){
    reg = reg.toLowerCase();
    const user = this.auth.currentUser;
    this.db.object("users/"+user?.uid+"/vehicles/"+reg).set({
      reg:reg
    });
  }

  getVehiclesFromUser(){
    const user = this.auth.currentUser;
    return this.db.list("users/"+user?.uid+"/vehicles");
  }

  deleteVehicleFromUser(reg:any){
    console.log("reg2",reg);
    
    const user = this.auth.currentUser;
    this.db.object("users/"+user?.uid+"/vehicles/"+reg).remove();
  }

  //User ticket functions
  addTicketToUser(ticket:any){
    const user = this.auth.currentUser;
    this.db.object("users/"+user?.uid+"/tickets/"+ticket.id).set({
      id: ticket.id,
      ticketStart: ticket.start,
      ticketEnd: ticket.end,
      duration: ticket.duration,
      price: ticket.price
    });
  }

  getTicketsFromUser(){
    const user = this.auth.currentUser;
    return this.db.list("users/"+user?.uid+"/tickets");
  }
}
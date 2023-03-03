import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService {

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
  addVehicleToUser(reg:any){
    const user = this.auth.currentUser;
    this.db.object("users/"+user?.uid+"/vehicles/"+reg).set({
      reg:reg
    });
  }

  getVehicles(){
    const user = this.auth.currentUser;
    return this.db.list("users/"+user?.uid+"/vehicles");
  }

  //User ticket functions
  addTicketToUser(ticket:any){
    const user = this.auth.currentUser;
    this.db.object("users/"+user?.uid+"/tickets/"+ticket.id).set({
      id: ticket.id,
      ticketStart: ticket.start,
      ticketEnd: ticket.end,
      ticketDuration: ticket.duration,
      price: ticket.price
    });
  }

  buyTicket(){
    
  }
}
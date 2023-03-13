import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.page.html',
  styleUrls: ['./ticket-history.page.scss'],
})
export class TicketHistoryPage implements OnInit {

  tickets:any;
  activeTicket:boolean = false;
  ticket:any;

  constructor(private userService:UserService) { }

  ionViewDidEnter(): void{
    this.ticket = null;
    this.checkActiveTicket();
  }

  ngOnInit() {
    this.userService.getTicketsFromUser().valueChanges().subscribe((res:any) => {
      this.tickets = res;
      console.log("tickets",this.tickets);
    });  
    this.checkActiveTicket();
  }

  async checkActiveTicket(){
    this.activeTicket = false;
    const curTime = new Date();
    this.userService.getTicketsFromUser().valueChanges().subscribe((res:any)=>{
      for(let ticket of res){
        const endTime = new Date(ticket.ticketEnd)
        if(endTime > curTime){
          this.activeTicket = true;
          this.ticket = ticket;
          break;
        }
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.page.html',
  styleUrls: ['./ticket-history.page.scss'],
})
export class TicketHistoryPage implements OnInit {

  tickets:any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getTicketsFromUser().valueChanges().subscribe((res:any) => {
      this.tickets = res;
      console.log("tickets",this.tickets);
    });  
  }

}

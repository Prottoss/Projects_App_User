import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PickerController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.page.html',
  styleUrls: ['./buy-ticket.page.scss'],
})
export class BuyTicketPage implements OnInit {

  currentTime!: Date;
  parkingTime: any;
  expiryTime: any;
  totalPrice: any;
  constructor(public userService: UserService, private pickerCtrl: PickerController ) { }

  ngOnInit(): void {
    timer(0,1000).subscribe(() =>{
      this.currentTime = new Date();
    });
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'timeSelected',
          options: [
            {
              text: '1 Hour',
              value: 1,
            },
            {
              text: '2 Hours',
              value: 2,
            },
            {
              text: '3 Hours',
              value: 3,
            },
            {
              text: '4 Hours',
              value: 4,
            },
            {
              text: '5 Hours',
              value: 5,
            },
            {
              text: '6 Hours',
              value: 6,
            },
            {
              text: '7 Hours',
              value: 7,
            },
            {
              text: '8 Hours',
              value: 8,
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.parkingTime = value.timeSelected.value;
            this.incrementTime(this.parkingTime);
            this.calcTotal(this.parkingTime);
          },
        },
      ],
    });

    await picker.present();
  }

  async incrementTime(time:any) {
    const incr = time * 60 * 60 * 1000; // convert hours to milliseconds
    this.expiryTime = new Date(this.currentTime.getTime() + incr); 
  }

  async calcTotal(time:any)
  {
    const temp = time * 0.30;
    this.totalPrice = (Math.round(temp * 100) / 100).toFixed(2);
  }

  async createTicket(){
    const short = require("short-uuid");
    const uuid = short.generate();
    
    const ticket = {
      id:uuid,
      start: this.currentTime.toString(),
      end: this.expiryTime.toString(),
      duration: this.parkingTime,
      price: this.totalPrice
    }
    this.userService.addTicketToUser(ticket);
  }



}

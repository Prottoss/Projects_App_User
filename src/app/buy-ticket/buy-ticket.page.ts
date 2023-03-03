import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.page.html',
  styleUrls: ['./buy-ticket.page.scss'],
})
export class BuyTicketPage implements OnInit {

  currentTime = new Date();
  parkingTime: any;
  expiryTime: any;
  constructor(public userService: UserService, private pickerCtrl: PickerController ) { }

  ngOnInit() {
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
            this.incrementTime(value.timeSelected.value);
          },
        },
      ],
    });

    await picker.present();
  }

  async incrementTime(time:any) {
    const incrementMilliseconds = time * 60 * 60 * 1000; // convert hours to milliseconds
    const newTime = new Date(this.currentTime.getTime() + incrementMilliseconds);
    this.expiryTime = newTime;
  }

}

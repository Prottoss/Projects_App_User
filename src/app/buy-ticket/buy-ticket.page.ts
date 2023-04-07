import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PickerController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';


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
  validTicket: boolean = false;
  custEmail: any;

  constructor(public userService: UserService, private pickerCtrl: PickerController) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

  ionViewDidEnter(): void{
    this.expiryTime = null;
    this.totalPrice = null;
    this.checkValidTicket();
    this.userService.getUser().valueChanges().subscribe((res:any)=>{
      this.custEmail = res.email;
    });
    console.log("hehe", this.custEmail);
  }

  ngOnInit(): void {
    this.userService.getUser().valueChanges().subscribe((res:any)=>{
      this.custEmail = res.email;
    });

    timer(0,1000).subscribe(() =>{
      this.currentTime = new Date();
    });
    this.checkValidTicket();
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
    this.expiryTime = null;
    const incr = time * 60 * 60 * 1000; // convert hours to milliseconds
    this.expiryTime = new Date(this.currentTime.getTime() + incr);
  }

  async calcTotal(time:any)
  {
    const temp = time * 0.50;
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
    this.expiryTime = null;
    this.totalPrice = null;
  }

  async checkValidTicket(){
    this.validTicket = false;
    const curTime = new Date();
    this.userService.getTicketsFromUser().valueChanges().subscribe((res:any)=>{
      for(let ticket of res){
        const endTime = new Date(ticket.ticketEnd)
        if(endTime > curTime){
          this.validTicket = true;
          break;
        }
      }
      console.log(this.validTicket);
    });
  }

  async paymentSheet() {
    // be able to get event of PaymentSheet
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('PaymentSheetEventsEnum.Completed');
    });
  
    // prepare PaymentSheet with CreatePaymentSheetOption.

    const stripe = require('stripe')(environment.stripe.secretKey);

    const customer = await stripe.customers.create({
      email:this.custEmail,
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer:customer.id},
      {apiVersion:"2022-11-15"}
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: this.totalPrice*100,
      currency: 'eur',
      customer:customer.id,
      automatic_payment_methods:{
        enabled:true
      }
    });

    await Stripe.createPaymentSheet({
      paymentIntentClientSecret: paymentIntent.client_secret,
      customerId:customer.id,
      customerEphemeralKeySecret: ephemeralKey.id,
      merchantDisplayName: "ParkIT"
    });
  
    //present PaymentSheet and get result.
    const result = await Stripe.presentPaymentSheet();
    console.log("result",result);
    if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      this.createTicket();
    }
  };



}

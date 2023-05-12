import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { take, timeout } from 'rxjs';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})

export class AddVehiclePage implements OnInit {

  cars:[] = [];
  carFound;

  constructor(private alertCtrl: AlertController, private userService: UserService) {}

  ngOnInit() {
    this.userService.getVehiclesFromUser().valueChanges().subscribe((res:any) => {
      this.cars = res;
      console.log("cars",this.cars);
    });  
  }

  async addVehicle(){

    const noInputAlert = await this.alertCtrl.create({
      header: 'Warning!',
      message: 'No input found!',
      buttons: ['OK'],
    });

    const carExistsAlert = await this.alertCtrl.create({
      header: 'Warning!',
      message: 'This vehicle is registred with another user.',
      buttons: ['OK'],
    });

    const addVehicleAlert = await this.alertCtrl.create({
      header: 'Add Vehicle',
      inputs: [
        {
          name: 'reg',
          placeholder: 'Reg: 123g456',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: async res => {
            if(res.reg == ""){
              noInputAlert.present();
            }
            else{
              const carExists = await this.findVehicleInDb(res.reg);
              if (carExists) {
                carExistsAlert.present();
              }
              else{
                this.userService.addVehicleToUser(res.reg);
              }
            }
          }
        }
      ]
    });

    await addVehicleAlert.present();
  }

  async deleteVehicle(reg:any){
    this.userService.deleteVehicleFromUser(reg);
    console.log(reg);
  }

  findVehicleInDb(reg:any)
  {
    return new Promise(resolve => {
      this.userService.getUsers().valueChanges().pipe(take(1)).subscribe((res: any) => {
        for(let user of res)
        {
          for(let car in user.vehicles)
          {
            if(car == reg){
              resolve(true);  // Resolve promise with 'true' when car is found
              return;
            }
          } 
        }
        // No such vehicle in the database!
        resolve(false);  // Resolve promise with 'false' when no car found
      });
    });
  }
}

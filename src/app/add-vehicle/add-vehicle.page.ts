import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})

export class AddVehiclePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addVehicle(){
    
  }

}

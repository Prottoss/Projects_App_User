import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  userId: any;
  userEmail: any;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private userService: UserService 
  ) {}

  get email(){
    return this.credentials.get("email");
  }

  get password(){
    return this.credentials.get("password");
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email:["",[Validators.required,Validators.email,Validators.pattern("^[Dd][0-9]{8}@student.dkit.ie$")]],
      password: ["",[Validators.required,Validators.minLength(6)]]
    })
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user){
      this.userId = user.user?.uid;
      this.userEmail = user.user?.email;
      this.userService.createUser(this.userId,this.userEmail);
      this.router.navigateByUrl("/home", {replaceUrl: true});
    }else{
      this.showAlert("Registration failed", "Please try again!");
    }
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user){
      this.userId = user.user?.uid;
      this.userEmail = user.user?.email;
      this.router.navigateByUrl("/home", {replaceUrl: true});
    }else{
      this.showAlert("Login failed", "Please try again!");
    }
  }

  async showAlert(header:any, message:any){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons:["OK"],
    });
    await alert.present();
  } 
}

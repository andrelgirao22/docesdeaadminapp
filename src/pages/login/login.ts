import { AuthService } from './../../services/model/auth.service';
import { CredenciaisDTO } from './../../model/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciais: CredenciaisDTO = {
    username :"", 
    password: ""
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public authService: AuthService) {
  }

  login() {
    this.authService.authenticate(this.credenciais).subscribe(res => {
      this.authService.successfullLogin(JSON.parse(res.body))
        this.navCtrl.setRoot('HomePage')
    }, error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(res => {
      if(this.authService.successfullLogin(JSON.parse(res.body))) {
        this.navCtrl.setRoot('HomePage')
      }
    }, error => {})
  }

}

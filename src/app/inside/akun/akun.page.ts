import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService, USER_LOGIN_KEY } from 'src/app/services/authentication.service';
import { from } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})
export class AkunPage implements OnInit {

  isReadOnly: boolean = true;
  user:any={}
  phone_number;

  constructor(private auth:AuthenticationService,
              private help:HelperService) { }

  ngOnInit() {
    this.getUser()
  }

  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }
  
  async getUser(){
    const data = await Preferences.get({key: USER_LOGIN_KEY});
    const user = JSON.parse(data.value);
    this.user = user
    this.phone_number = this.user.phone_number;
  }

  async Editnumber(){
    from(this.auth.editnumber(this.phone_number)).subscribe(res=>{
      if(res['status']){
        this.help.showToast(res['message'],'success');
        this.user.phone_number = this.phone_number
        const user_json = JSON.stringify(this.user);
        Preferences.set({key:USER_LOGIN_KEY, value:user_json});
        
      }
    })
  }

  async resetPassword(){

  }

  logout(){
    this.auth.logout();
  }

}

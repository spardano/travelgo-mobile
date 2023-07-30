import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credential: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthenticationService,
              private helper: HelperService) { }

  ngOnInit() {
    this.credential = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(){
    this.helper.alertEverythingModal('loading', 'Login', 'Sedang Memuat...');
    this.auth.login(this.credential.value).subscribe(_=>{
     
    });
  }

  async resetPassword(){

  }

}

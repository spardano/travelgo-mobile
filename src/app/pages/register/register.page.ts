import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validation_messages_register } from 'src/app/messages/error-message';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  RegisterData: FormGroup;
  validation_messages = validation_messages_register;
  
  constructor(private fb: FormBuilder,
              private auth: AuthenticationService) { }

  ngOnInit() {

    this.RegisterData = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.max(100), 
        Validators.pattern('[a-zA-Z ]*')] ],

      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],

      password: ['', [
        Validators.required, 
        Validators.minLength(8)] ],

      cpassword: ['', [
        Validators.required] ],

    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('cpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  register(){
    this.auth.register(this.RegisterData.value).subscribe();
  }

}

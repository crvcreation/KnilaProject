import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CAuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  // form: FormGroup = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl('')
  // });

  form=new FormGroup({
    userName:new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
  });

  constructor(private formBuilder: FormBuilder,private auth : CAuthService) {
    
  }

  get userName():FormControl{
    return this.form.get('userName')as FormControl;
  }
  get password():FormControl{
    return this.form.get('password')as FormControl;
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group(
    //   {
    //     userName: ['', [Validators.required, Validators.email]],
    //     password: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.minLength(6),
    //         Validators.maxLength(40)
    //       ]
    //     ]
    //   }
    // );
}
  onSignIn(){
    if (this.form.valid) {
      this.auth.login(this.form.value);
    } else {
      alert("error");
    }
  }
}








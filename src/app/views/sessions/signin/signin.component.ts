import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl, EmailValidator } from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import {map, take, debounceTime} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  
  loginForm : FormGroup;
  //signinForm: FormGroup;

  constructor(
  private afs: AngularFirestore,
  private fb: FormBuilder,
  public auth : AuthService,
  public router: Router) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group ({
      email:['',[
        Validators.required,
        Validators.email
      ]],
      password:['',[
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
    });
    // this.signinForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    //   rememberMe: new FormControl(false)
    // })
  }

    // User getters for cleaner HTML code
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  googleSignIn():void{
    this.auth.googleLogin();
    this.router.navigate(['/profile/overview']);
  }

  facebookSignIn():void {
    this.auth.facebookLogin();
    this.router.navigate(['/profile/overview']);
  }
  emaillogin(): void {
    //this.auth.emailLogin(this.userForm.value)
   this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
   this.router.navigate(['/profile/overview'])
  }

  anonymousLogin():void{
    this.auth.anonymousLogin()
    this.router.navigate(['/profile/overview']);
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

 formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };




}
// export class CustomValidator {
//   static password(afs: AngularFirestore){
//     return (control: AbstractControl) =>{
//       const password = control.value.toLowerCase();
//       return afs.collection('users', ref=>ref.where('password', '==', password))
//           .valueChanges().pipe(
//             debounceTime(500),
//             take(1),
//             map(arr=> arr.length? {passwordAvaiable:false}:null),
//           )
//     }  
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl, EmailValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from  '../../../core/auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import { Router } from '../../../../../node_modules/@angular/router';
import {map, take, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

signupForm: FormGroup


constructor(
  private afs: AngularFirestore,
  private fb: FormBuilder,
  public auth : AuthService,
  public router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group ({
      email:['',[
        Validators.required,
        Validators.email,
       // CustomValidator.email,
      ]],
      password:['',[
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
    });
    
  }
    // User getters for cleaner HTML code
    get email(){
      return this.signupForm.get('email')
    }
    get password(){
      return this.signupForm.get('password')
    }

  signup(): void {
    this.auth.emailSignUp(this.signupForm.value['email'], this.signupForm.value['password'])
    this.router.navigate(['/sessions/signin'])
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
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
//   static email(afs: AngularFirestore){
//       return (control: AbstractControl) =>{
//         const email = control.value.toLowerCase();
//         return afs.collection('users', ref=>ref.where('email', '==', email))
//             .valueChanges().pipe(
//              debounceTime(500),
//             take(1),
//               map(arr=> arr.length? {emailAvaiable:false}:null),
//            )
//     }  
//     }
 //}
  
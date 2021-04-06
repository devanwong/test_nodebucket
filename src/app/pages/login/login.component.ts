/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 18 March 2021;
Modified By: Douglas Jenkins;
Description: creating a sign in page
;===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
// newly added MatSnackBar which will open the message
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // allows all the import functions to work properly
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm =this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }
// When logging in you will be navigated to the page if you input the correct employee number or you will receive a error message if it is wrong
  login(){
    const empId = this.loginForm.controls['empId'].value;
    console.log(empId);

    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res['data'])
      {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      else if(!(res['data']) && (res['httpCode'] === '200'))
      {
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      }
      else
      {
        this.openSnackBar(res['message'], 'ERROR');
      }
    })
  }

  openSnackBar(message: string, notificationType: string) : void
  {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }

}

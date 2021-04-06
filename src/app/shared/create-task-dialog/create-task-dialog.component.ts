/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 31 March 2021;
Modified By: Douglas Jenkins;
Description: Creating the UI page
;===========================================*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

 taskForm: FormGroup

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  /**
   * creates the form to write in
   */
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  /**
   * allows to close the form
   */
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  /**
   *
   */
  cancel() {
    this.dialogRef.close();
  }
}

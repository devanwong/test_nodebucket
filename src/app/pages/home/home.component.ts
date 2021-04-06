/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 31 March 2021;
Modified By: Douglas Jenkins;
Description: Creating the UI page
;===========================================*/

import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/item.interface';
import { Employee } from 'src/app/shared/employee.interface';
import { TaskService } from 'src/app/shared/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // array of the created items
  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server Response form findAllTasks--');
      console.log(res);

      this.employee = res.data;
      console.log('--Employee Object--');
      console.log(this.employee);
    }, err => {
      console.log(err);
    }, () => { //shorter version of function

      // on complete

      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is in the complete section');
      console.log(this.todo);
      console.log(this.done);

    })

   }

  ngOnInit(): void {
  }

  /**
   *
   */

  openCreateTaskDialog(){
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
        }, err =>{
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  /**
   *
   * @param event
   *  the action that allows you to drop the task
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Reordered item in an existing column/array");
      this.updateTaskList(this.empId, this.todo, this.done);
    }
    else
    {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.log("Reordered item in an existing column/array");
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /**
   *
   * @param taskId
   * allows for to delete the task
   */
  deleteTask(taskId: string): void {
    if (taskId)
    {
      console.log(`Task item ${taskId} was deleted`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
      }, err =>{
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }


  /**
   *
   * @param empId
   * @param todo
   * @param done
   */
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err =>{
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }


}

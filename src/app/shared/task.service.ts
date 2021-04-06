/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 31 March 2021;
Modified By: Douglas Jenkins;
Description: Creating the UI page
;===========================================*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @param empId
   * @returns an Observable of any type
   */

  findAllTasks(empId: string): Observable<any>{

    return this.http.get('api/employees/' + empId + '/tasks')
  }

/**
 *
 * @param empId
 * @param task
 * @returns the creation of the task
 */
  createTask(empId: string, task: string) : Observable<any>{
    return this.http.post('api/employees/' + empId + '/tasks', {
      text: task
    })
  }


/**
 *
 * @param empId
 * @param todo
 * @param done
 * @returns the list that is created
 */

  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any>{
    return this.http.put('api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }


/**
 *
 * @param empId
 * @param taskId
 * @returns the deleted entry
 */

  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`api/employees/${empId}/tasks/${taskId}`);
  }
}

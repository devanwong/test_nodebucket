/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 31 March 2021;
Modified By: Douglas Jenkins;
Description: Creating the UI page
;===========================================*/

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 24 March 2021;
Modified By: Douglas Jenkins;
Description: creating the tasks for soap ui
;===========================================*/

const express = require('express');
const Employee = require('../db-models/employee');
const BaseResponse = require('../service/base-response');
// const { $ } = require('protractor');

// defines router variable
const router = express.Router();

/*
http://localhost:3000/api/employees
http://localhost:3000/api/employees/:empId
http://localhost:3000/api/employees
http://localhost:3000/api/employees/:empId
http://localhost:3000/api/employees/:empId
*/

/**
 * API: findEmployeeId
 * @param empId
 * @returns Employee document or null
 */

router.get('/:empId', async(req, res) => {

  // to specify variable you go by the name in the route
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
    // if there is a error this will be displayed
      if (err)
      {
      console.log(err);
      const MongoDBErrorResponse = new BaseResponse('500', `MongoDB native Error: ${err}`, null);
      res.json(MongoDBErrorResponse.toObject());
      }
      else // will be displayed if you put in the correct employee value
      {
        console.log(employee);
        const employeeResponse = new BaseResponse('200', 'Successful Query', employee);
        res.json(employeeResponse.toObject());
      }
    })
  }
      catch (e)
      {
        console.log(e);
        const findEmployeeCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null);
        res.json(findEmployeeCatchError.toObject());
    }
  })


//--------------------------------------------------------------------------------------------------------------

/**
 * API createTask
 */

router.post ('/:empId/tasks', async(req, res) => {

  //helps print out the empId (Is a way to help debug and find errors)
  console.log(req.params.empId);

  try{

    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if (err)
      {
        console.log(err);

        const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exception: ${e.message}`, null);

        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
          console.log("Inside else statement of create Task API");
          console.log(employee);

        // helps so the server will not crash or have issues
          if (employee){

            const item = {
              text: req.body.text
            };

            employee.todo.push(item);

            employee.save(function(err, updatedEmployee){

              if (err)
              {
                  console.log(err);

                  const createTaskOnSaveMongoDbError = new BaseResponse('500', `MongoDB onSave() exception: ${e.message}`, null);

                  res.status(500).send(createTaskOnSaveMongoDbError.toObject());
              } else {
                  console.log(updatedEmployee);
                // when you get a successful query this will be posted with the applied employee Id
                  const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful Query', updatedEmployee);

                  res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
              }
           })

          } else {

            console.log('invalid employeeId');

            const invalidEmployeeIdResponse = new BaseResponse ('200', 'Invalid Employee', null);

            res.status(200).send(invalidEmployeeIdResponse.toObject());
          }

       }
    })



  } catch (e) {
    console.log(e);

    const createTaskCatchException = new BaseResponse('500', `Internal Server Error: ${e.message}`, null);

    res.status(500).send(createTaskCatchException.toObject());
  }

})

//--------------------------------------------------------------------------------------------------------------

/**
 * API findAllTasks
 */
router.get('/:empId/tasks', async(req, res) => {
  try
  {
    // when the find one it calls it searches through the created empId's
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee){

      //added a projection that only takes certain data

      if (err)
            {
                console.log(err);

                const mongoDBFindAllTasksException = new BaseResponse('500', `Internal server error ${e.message}`, null);

                res.status(500).send(mongoDBFindAllTasksException.toObject());
            } else
            {
                console.log(employee);

                const employeeTaskResponse = new BaseResponse('200', 'Successful Query', employee);

                res.status(200).send(employeeTaskResponse.toObject());
            }
    })
  }
  catch (e) // allows to catch errors that will be in the findAllTasks
  {
    console.log(e);

    const errorCatchResponse = new BaseResponse('500', `Internal Server Error: ${e.message}`, null);

    res.status(500).send(errorCatchResponse.toObject());
  }

})


//--------------------------------------------------------------------------------------------------------------

/**
 * API: updateTask
 */
router.put('/:empId/tasks', async(req, res) => {
  try
  {

    Employee.findOne({'empId': req.params.empId}, function(err, employee){

      //added a projection that only takes certain data

      if (err)
            {
                console.log(err);

                const updateTaskMongodbException = new BaseResponse('500', `Internal server error ${e.message}`, null);

                res.status(500).send(updateTaskMongodbException.toObject());
            }
            else
            {
                console.log(employee);
                  if (employee)
                  {
                    employee.set({
                      todo: req.body.todo,
                      done: req.body.done
                    });

                    // make sure to have different values such as using updated employee
                    employee.save(function(err, updatedEmployee){
                      if (err)
                      {
                        console.log(err);

                        const updateTaskMongoDbError = new BaseResponse('500', `Internal server error ${e.message}`, null);

                        res.status(500).send(updateTaskMongoDbError.toObject());
                      }
                      else
                      {
                        // if successful the information below will be printed
                        console.log(updatedEmployee);

                        const updatedTaskSuccessResponse = new BaseResponse('200', 'Successful Query', updatedEmployee);

                        res.status(200).send(updatedTaskSuccessResponse.toObject());
                      }

                    })

                  }
                  else
                  {
                    // if you are unsuccessful the information below will appear
                    console.log(`invalid employeeId! The passed-in value was ${req.params.empId}`);

                    const invalidEmployeeIdResponse = new BaseResponse ('200', 'Invalid Employee', null);

                    res.status(200).send(invalidEmployeeIdResponse.toObject());
                  }

            }
    })

  }
  catch (e) // allows to catch errors that will be in the findAllTasks
  {
    console.log(e);

    const updateTaskCatchResponse = new BaseResponse('500', `Internal Server Error: ${e.message}`, null);

    res.status(500).send(updateTaskCatchResponse.toObject());
  }

})

//--------------------------------------------------------------------------------------------------------------

/**
 * API: deleteTask
 */
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){

      //added a projection that only takes certain data

      if (err)
            {
                console.log(err);

                const deleteTaskMongoDbError = new BaseResponse('500', `Internal server error ${e.message}`, null);

                res.status(500).send(deleteTaskMongoDbError.toObject());
            }
            else
            {
              console.log (employee);

              // finds the string from the employee todo and done

              const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);

              const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

              if (todoItem)
              {
                console.log(todoItem);

                employee.todo.id(todoItem._id).remove();

                employee.save(function(err, updatedTodoItemEmployee) {
                  if (err)
                  {
                    console.log(err);

                    const deleteTodoItemMongodbError = new BaseResponse('500', `Internal server error ${e.message}`, null);

                    res.status(500).send(deleteTodoItemMongodbError.toObject());
                  }
                  else
                  {
                    // if successful the information below will be printed

                    console.log(updatedTodoItemEmployee);

                    const deleteTodoItemSuccess = new BaseResponse('200', 'Successful Query', updatedTodoItemEmployee);

                    res.status(200).send(deleteTodoItemSuccess.toObject());

                  }
                })
              }
              else if (doneItem)
              {
                console.log(doneItem);

                employee.done.id(doneItem._id).remove();

                employee.save(function(err, updatedDoneItemEmployee){
                  if (err)
                  {
                    console.log(err);

                    const deleteDoneItemMongodbError = new BaseResponse('500', `Internal server error ${e.message}`, null);

                    res.status(500).send(deleteDoneItemMongodbError.toObject());
                  }
                  else
                  {
                    console.log(updatedDoneItemEmployee);

                    const deleteDoneItemSuccess = new BaseResponse('200', 'Successful Query', updatedDoneItemEmployee);

                    res.status(200).send(deleteDoneItemSuccess.toObject());

                  }
                })
              }
              else
              {
                // if you have invalid data this information will be displayed

                  console.log(`Invalid employeeId! The passed in value was ${req.params.taskId}`);

                  const invalidTaskIdResponse = new BaseResponse('200', 'Invalid taskId',null);

                  res.status(200).send(invalidTaskIdResponse.toObject());
              }

        }
    })
  }

  catch (e)
  {
    console.log(e);

    const deleteTaskCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null);

    res.status(500).send(deleteTaskCatchError.toObject());
  }

})




module.exports = router;

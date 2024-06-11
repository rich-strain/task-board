// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
if (!taskList) {
  taskList = [];
}
let nextId = JSON.parse(localStorage.getItem('nextId'));

console.log('Page Load Task List:', taskList);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // use crypto.randomUUID() to create a unique id
  let taskId = crypto.randomUUID();
  return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  //create card elements and classes
  // append card elements to card
  // return card?
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // makes cards draggable with jQuery UI
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  // create task object
  let task = {
    id: generateTaskId(),
    name: $('#taskName').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'toDo',
  };

  taskList.push(task);

  // save taskList to localStorage
  localStorage.setItem('task', JSON.stringify(taskList));
  console.log('TaskList', taskList);
  // hide modal popup
  $('#formModal').modal('hide');
  //reset form
  document.getElementById('taskForm').reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // delete task by Unique ID
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // update the task to the new status lane
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // render the task list
  //renderTaskList();

  // add event listeners
  $('#addTask').on('click', handleAddTask);
  // $('#taskList').on('click', '.delete', handleDeleteTask);

  // make lanes droppable
  // $('.lane').droppable({
  //   drop: handleDrop,
  // });

  // make due date a date picker
  $('#taskDueDate').datepicker({
    dateFormat: 'mm/dd/yy',
    changeMonth: true,
    changeYear: true,
  });
}); // end of document ready

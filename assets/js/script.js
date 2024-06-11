// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

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
  // prevent default form submission
  event.preventDefault();
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
  // $('#addTaskForm').on('submit', handleAddTask);
  // $('#taskList').on('click', '.delete', handleDeleteTask);

  // make lanes droppable
  // $('.lane').droppable({
  //   drop: handleDrop,
  // });

  // make due date a date picker
  $('#dueDate').datepicker();
}); // end of document ready

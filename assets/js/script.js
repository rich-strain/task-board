// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
if (!taskList) {
  taskList = [];
}

let nextId = JSON.parse(localStorage.getItem('nextId'));
//console.log('Page Load Task List:', taskList);

// Generate UUID Using Crypto.randomUUID() //
function generateTaskId() {
  // use crypto.randomUUID() to create a unique id
  let taskId = crypto.randomUUID();
  return taskId;
}

// Handle New Task Submitted Through Modal //
// Save Task To Local Storage //
function handleAddTask(event) {
  event.preventDefault();

  // create newTask object
  const newTask = {
    id: generateTaskId(),
    name: $('#taskName').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'to-do',
  };

  taskList.push(newTask);

  // save taskList to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));
  // hide modal popup and reset form
  $('#formModal').modal('hide');
  document.getElementById('taskForm').reset();
  renderTaskList();
}

// Create Card Elements For Task //
function createTaskCard(task) {
  //create card elements and classes
  const taskCard = $('<div>').addClass('card project-card draggable my-3').attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete Task').attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // Due Today Yellow Card, Overdue Red Card
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // append card elements
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Render Task List To Page and Make Cards Draggable //
// Create Todo Card Container For Each Task //
// Ensure Cards Are Draggable //
function renderTaskList() {
  console.log('--- taskList var within renderTaskList --- ');
  console.log(taskList);

  const todoLane = $('#todo-cards');
  todoLane.empty();

  const inProgLane = $('#in-progress-cards');
  inProgLane.empty();

  const doneLane = $('#done-cards');
  doneLane.empty();

  // loop through taskList[] to create todo-cards for each task
  for (let i of taskList) {
    if (i.status === 'to-do') {
      console.log('To Do Task: ', i.name);
      todoLane.append(createTaskCard(i));
    } else if (i.status === 'in-progress') {
      console.log('In Progress Task: ', i.name);
      inProgLane.append(createTaskCard(i));
    } else if (i.status === 'done') {
      console.log('Task Done: ', i.name);
      doneLane.append(createTaskCard(i));
    }
  }
  // jQueryUI draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // creates clone of the card that is dragged
    helper: function (e) {
      // check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable') ? $(e.target) : $(e.target).closest('.ui-draggable');
      /// return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Delete Task By UUID //
function handleDeleteTask(event) {
  console.log('Event: ', event);
  const taskId = $(this).attr('data-task-id');
  taskList = taskList.filter((task) => task.id !== taskId);
  // const taskId = $(this).attr('data-task-id');
  // taskList = taskList.filter((task) => task.id !== taskId);
  // localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Handle Task Drop Event //
function handleDrop(event, ui) {
  // update the task to the new status lane
  // get the task id
  const taskId = ui.helper.attr('data-task-id');
  // get the new status lane
  const newStatus = $(event.target).attr('id');
  // find the task in taskList[]
  const task = taskList.find((task) => task.id === taskId);
  // update the task status
  task.status = newStatus;
  // save taskList to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));
  // render the updated taskList
  renderTaskList();
}

$(document).ready(function () {
  // Call renderTaskList()
  renderTaskList();

  // add event listeners
  $('#addTask').on('click', handleAddTask);
  // $('#taskList').on('click', '.delete', handleDeleteTask);

  // make lanes droppable
  $('.lane').droppable({
    drop: handleDrop,
  });

  // make due date a date picker
  $('#taskDueDate').datepicker({
    dateFormat: 'mm/dd/yy',
    changeMonth: true,
    changeYear: true,
  });
}); // end of document ready

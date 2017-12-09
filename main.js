var todos = [];

function ToDo(name, value) {
  this.name = name;
  this.completed = value;
  let today = new Date();
  this.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}

function addNewDone(name) {
  let d = new ToDo(name, true);
  todos.push(d);
  saveToDosToLocalStorage();
}

function addNewToDoWithName(name) {
  let t = new ToDo(name, false);
  todos.push(t);
  saveToDosToLocalStorage();
}

function removeToDoAtIndex(index) {
  todos.splice(index, 1);
  saveToDosToLocalStorage();
}

function getToDoAtIndex(index) {
  return todos[index];
}

function saveToDosToLocalStorage() {
  let string = JSON.stringify(todos);
  localStorage.setItem("todos", string);
}

function getToDosFromLocalStorage(date) {
  let str = localStorage.getItem("todos");
  todos = JSON.parse(str);

  if(!todos) {
    todos = [];
  }

  listToDos(date);
  listDone(date);
}

function listToDos(date) {
  let htmlString = "";
  todos.map((item, index) => {
    if (item.completed == false){
    //console.log(item.name);
    htmlString += "<p><li id='" + index + "'>" + item.name + "<button class='btn-success btn-sm'>done?</button></li></p>";
    }
  });
  $("#list-todos").html(htmlString);
}

function listDone(date) {
  let htmlString ="";
  todos.map((item, index) => {
    if (item.completed == true && item.date == date){
    //console.log(item.name);
    htmlString += "<p><li id='" + index + "'>" + item.name + "</li></p>";
    }
  });
  $("#list-done").html(htmlString);
}

$("#add-todo-form").submit((event) => {
  event.preventDefault();
  let name = $("#todo-name").val();
  $("#todo-name").val('');
  addNewToDoWithName(name);
  listToDos();
});

$(document).on("click", ':button', function(e){
  let id = $(this).parent().attr('id');
  let done_task = todos[id].name;
  let htmlString = "<p><li>" + done_task + "</li></p>";
  $("#list-done").append(htmlString);
  addNewDone(htmlString);
  $("#" + id).css("display", "none");
  removeToDoAtIndex(id);
});

const today = new Date();
const todayDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
getToDosFromLocalStorage(todayDate);

function addDate() {
  let today = new Date();
  let todayDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  $("#today").html(todayDate);
}

addDate();

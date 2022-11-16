"use strict";
const btnAdd = document.getElementById("btn-add");
const todoContainer = document.getElementById("todo-container");
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");

//Lấy dữ liệu Current User và tạo key lưu trữ todo
const Key_Cur = "currentUserArray";
const currentUserArr = getFromStorage(Key_Cur)
  ? JSON.parse(getFromStorage(Key_Cur))
  : [];

const Key_todo = "todoArray";
const todoArr = getFromStorage(Key_todo)
  ? JSON.parse(getFromStorage(Key_todo))
  : [];
console.log(todoArr);

//Class todo
class task {
  constructor(task, owner, isDone) {
    (this.task = task), (this.owner = owner), (this.isDone = isDone);
  }
}

// Todo Add

btnAdd.addEventListener("click", function () {
  if (!inputTask.value) {
    alert("Please input Task!");
  } else {
    const taskArr = new task(inputTask.value, currentUserArr.username, false);
    todoArr.push(taskArr);
    saveToStorage(Key_todo, JSON.stringify(todoArr));
    renderTask(todoArr);
    return (inputTask.value = "");
  }
});

//Đánh dấu task
const CheckTask = function () {
  document.querySelectorAll("#todo-list li").forEach((togge, i) => {
    togge.addEventListener("click", function () {
      togge.classList.toggle("checked");
      togge.isDone = togge.classList.contains("checked") ? true : false;
      console.log(togge);
      todoArr[i].isDone = togge.isDone;
      saveToStorage(Key_todo, JSON.stringify(todoArr));

      console.log(todoArr);
    });
  });
};

//Xóa các task
const delTask = function () {
  document.querySelectorAll(".close").forEach((del, i) => {
    del.addEventListener("click", function (event) {
      event.stopPropagation();
      const isDelete = confirm("Are you sure!");
      if (isDelete) {
        todoArr.splice(i, 1);
        saveToStorage(Key_todo, JSON.stringify(todoArr));
        renderTask(todoArr);
      }
    });
  });
};

//Hiển thị todo
const renderTask = function () {
  let html = "";

  todoArr
    .filter((taskArr) => taskArr.owner === currentUserArr.username)
    .forEach((taskArr) => {
      if (taskArr.isDone)
        html += `<li class="checked" data='${taskArr.task}'>
        ${taskArr.task}
         <span class="close" data='${taskArr.task}'>×</span></li>`;
      else {
        html += `<li data='${taskArr.task}'>
        ${taskArr.task}
         <span class="close" data='${taskArr.task}'>×</span></li>`;
      }
    });
  todoList.innerHTML = html;
  CheckTask();
  delTask();
};
renderTask(todoArr);

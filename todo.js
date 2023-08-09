document.addEventListener("DOMContentLoaded", (event) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const form = document.getElementById("form");
  const display = document.getElementById("todo-list");
  const error = document.getElementById("error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let task = document.getElementById("task").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    if (task == "") {
      error.innerHTML = `<p>&#9888; Please add a task.</p>`;
    } else if (date == "") {
      error.innerHTML = `<p>&#9888 Please add the date.</p>`;
    } else {
      addTask(task, date, notes);
    }
  });

  function addTask(task, date, notes) {
    let id = tasks.length + 1;
    const object = { id: id, task: task, date: date, notes: notes };
    tasks.push(object);
    // Store updated tasks array in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }

  function displayTasks() {
    display.innerHTML = "";
    error.innerHTML = "";
    tasks.forEach((obj, index) => {
      const todoitem = document.createElement("div");
      const h1 = document.createElement("h1");
      const span = document.createElement("span");
      const p = document.createElement("p");
      const editBtn = document.createElement("button");
      const delBtn = document.createElement("button");
      todoitem.classList.add("todo");
      editBtn.classList.add("edit");
      delBtn.classList.add("del");
      h1.textContent = `${obj.task}`;
      span.textContent = `${obj.date}`;
      p.textContent = `${obj.notes}`;
      editBtn.textContent = `Edit Task`;
      delBtn.textContent = `Delete Task`;
      editBtn.addEventListener("click", (event) => {
        event.preventDefault();
        editTask(index);
      });
      delBtn.addEventListener("click", (event) => {
        event.preventDefault();
        deleteTask(index);
      });
      todoitem.appendChild(h1);
      todoitem.appendChild(span);
      todoitem.appendChild(p);
      todoitem.appendChild(editBtn);
      todoitem.appendChild(delBtn);
      display.appendChild(todoitem);
    });
  }

  function editTask(index) {
    const taskToEdit = tasks[index];

     const editForm = document.createElement("div");
    editForm.classList.add("edit-form");

    const heading = document.createElement("h3");
    heading.textContent = `Edit Task`;

    const editTaskInput = document.createElement("input");
    editTaskInput.classList.add('editTask');
    editTaskInput.type = "text";
    editTaskInput.value = taskToEdit.task;

    const editDateInput = document.createElement("input");
    editDateInput.type = "date";
    editDateInput.classList.add('editDate');
    editDateInput.value = taskToEdit.date;

    const editNotesInput = document.createElement("input");
    editNotesInput.classList.add('editNotes');
    editNotesInput.type="text";
    editNotesInput.textContent = taskToEdit.notes;

    const updateBtn = document.createElement("button");
    updateBtn.classList.add('update');
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", () => {
      // Update the task in the array
      tasks[index].task = editTaskInput.value;
      tasks[index].date = editDateInput.value;
      tasks[index].notes = editNotesInput.value;

      // Update local storage and display
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    });

    editForm.appendChild(heading);
    editForm.appendChild(editTaskInput);
    editForm.appendChild(editDateInput);
    editForm.appendChild(editNotesInput);
    editForm.appendChild(updateBtn);

    // Clear the existing content and append the edit form
    const todoitem = display.children[index];
    todoitem.innerHTML = ""; // Clear existing content
    todoitem.appendChild(editForm);
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
    displayTasks();
  }

  // Initial display of tasks
  displayTasks();
});

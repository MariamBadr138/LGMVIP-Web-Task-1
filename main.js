let input = document.querySelector("#todo");
let Add = document.querySelector("#add");
let task = document.querySelector("#tasks");

//task array
let taskarray = [];

//check if there is task or no
if (localStorage.getItem("tasks")) {
    taskarray=JSON.parse(localStorage.getItem("tasks"));
}

getdata()


//add task
Add.onclick = function () {
    if (input.value.trim() === "") {
        alert("Please Enter Some Tasks");
        return;
    }



    if (input.value !== "") {
        addTask(input.value);
    
    }
    
};

//click on task element
task.addEventListener("click", (e) => {
    //delete button
    if (e.target.classList.contains("del")) {
        //remove from page
        e.target.parentElement.remove();
        //remove from storage
        deleteTask(e.target.parentElement.getAttribute("data-id"));
    }

    //task element
    if (e.target.classList.contains("task")) {

        //toggle.complete task
        toggleStatus(e.target.getAttribute("data-id"))

        //toggle.done.class
        e.target.classList.toggle("done");

    }

})




function addTask(tasktext) {
    // task 
    const tasks = {
        id: Date.now(),
        title: tasktext,
        complete: false,
    };
    //adding task to array
    taskarray.push(tasks);
    //show task at the page
    addElement(taskarray);
    //add task to storage 
    addToStorage(taskarray);
   
}
function addElement(taskarray) {
    //empty the div
    task.innerHTML = "";
    //loop on array
    taskarray.forEach((tasks) => {
        //create div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done 
        if (tasks.complete == true) {
            div.className = "task.done";
        }
        div.setAttribute("data-id", tasks.id);
        div.appendChild(document.createTextNode(tasks.title));
        //delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        //add button to div
        div.appendChild(span);
        //adding the tasks to the container
        task.appendChild(div);
        console.log(div);
    });
}

function addToStorage(taskarray) {
    window.localStorage.setItem("tasks", JSON.stringify(taskarray));
}
function getdata() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElement(tasks);
    }
}
function deleteTask(taskid) {
    taskarray = taskarray.filter((task) => task.id != taskid)
    addToStorage(taskarray);
}
function toggleStatus(taskid) {
    for (let i = 0; i < taskarray.length; i++) {
        if (taskarray[i].id == taskid) {
            taskarray[i].completed == false ? (taskarray[i].completed = true) : (taskarray[i].completed = false);
        }
    }
    addToStorage(taskarray)
}

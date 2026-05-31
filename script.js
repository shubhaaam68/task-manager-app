let currentUser = "";

function register() {

    fetch("http://localhost:5000/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("regEmail").value,
            password:document.getElementById("regPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>alert(data.message));
}

function login(){

    fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("loginEmail").value,
            password:document.getElementById("loginPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);

        if(data.success){
            currentUser=data.email;
            loadTasks();
        }
    });
}

function addTask(){

    fetch("http://localhost:5000/addTask",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:currentUser,
            title:document.getElementById("taskTitle").value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        loadTasks();
    });
}

function loadTasks(){

    fetch(`http://localhost:5000/tasks/${currentUser}`)
    .then(res=>res.json())
    .then(tasks=>{

        let list=document.getElementById("taskList");
        list.innerHTML="";

        tasks.forEach(task=>{

            list.innerHTML+=`
            <li>
                ${task.title}
                <button onclick="deleteTask('${task._id}')">
                    Delete
                </button>
            </li>
            `;
        });

    });
}

function deleteTask(id){

    fetch(`http://localhost:5000/deleteTask/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        loadTasks();
    });
}

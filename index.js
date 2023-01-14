window.addEventListener('load', () => { 
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    let taskList = JSON.parse(localStorage.getItem('taskList')) || []; 
    let taskFilesls = localStorage.getItem('taskFiles') || []; 
    function createtask(task){
        //ADD TASK ON EVENT: SUBMIT
            // effectively adding another 'task' div with it's own unique content
            const task_el = document.createElement("div");
            task_el.classList.add('task');
        
            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');
            // sets inner div value to task
        
            task_el.appendChild(task_content_el);
        
            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task;
            task_input_el.setAttribute('readonly','readonly');
        
            task_content_el.appendChild(task_input_el);
            
            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');
            
            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';
    
            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            const task_add_file_el = document.createElement('button');
            task_add_file_el.classList.add('addfile');
            task_add_file_el.innerText = '+'
    
            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
            task_actions_el.appendChild(task_add_file_el);
    
            task_el.appendChild(task_actions_el);
    
            list_el.appendChild(task_el);
    
            input.value = '';
            
        
        task_edit_el.addEventListener('click', ()=>{
            if (task_edit_el.innerText.toLowerCase() == 'edit'){
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute('readonly','readonly');
                const index = taskList.indexOf(task);
                taskList[index] = task_input_el.value;
                localStorage.setItem('taskList', JSON.stringify(taskList));
                task_edit_el.innerText = 'Edit'}  
        })
    
        task_delete_el.addEventListener('click', ()=>{
            list_el.removeChild(task_el);
            taskList = taskList.filter(function(x) {return x !== task});
            localStorage.setItem('taskList', JSON.stringify(taskList));
        })
        let taskFiles = []
        function attach(taskIndex){
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            input.addEventListener('change', () => {
                // handle the uploaded file here
                taskFiles[taskIndex] = input.files[0];
            });
            document.body.appendChild(input);
            input.click();
        }
        function download(file){
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.target = '_blank';
            a.click();
            URL.revokeObjectURL(url);
        }
        function checkattach(task){
            const index = taskList.indexOf(task);
            if(taskFiles[index] === undefined){
                return false;
            } else return true;
        }
        task_add_file_el.addEventListener('click', () => {
            const indexfile = taskList.indexOf(task);
            if (checkattach(task) === false){
                attach(indexfile);    
                task_add_file_el.innerText = 'Open';
            } else {
                const file = taskFiles[indexfile];
                if (file) {
                    download(file);
                }
            }
            

            
        });
    }   
    //for loop per task
    //handle task if task.length > 0//
    //...
    //(include button functionality of pre-saved tasks)
    list_el.innerHTML = "";
    const nonEmptyTasks = taskList.filter(task => task.trim() !== "");
    for (const task of nonEmptyTasks) {
        createtask(task);
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // stops from refreshing page
        const task = input.value;
        console.log(task);
        console.log(input.disabled);
       
        if (!task.trim()){
            //alert("Please fill out task entry!");
            return;
        }
        createtask(task)
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        input.value = '';
    })
})




